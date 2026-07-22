import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.ARMAZENAR_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.ARMAZENAR_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || ''
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, contact, service, message } = req.body;

  if (!name || !contact || !service) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
  }

  // 1. Salvar no Supabase
  const { error: dbError } = await supabase
    .from('users-mesange')       // ← nome corrigido (era users_mensange)
    .insert([{ name, contact, service, message }]);

  if (dbError) {
    console.error('Erro ao salvar no Supabase:', dbError);
    // continua mesmo se falhar, para tentar enviar o e-mail
  } else {
    console.log('Lead salvo no Supabase com sucesso.');
  }

  // 2. Enviar e-mail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const body = `
    <h1>Nova solicitação de orçamento</h1>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Contato:</strong> ${contact}</p>
    <p><strong>Serviço:</strong> ${service}</p>
    <p><strong>Mensagem:</strong> ${message || 'Sem detalhes adicionais'}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Portfólio - Eliel Nicolas" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Solicitação de Orçamento - ${name}`,
      html: body,
      text: body.replace(/<[^>]*>/g, ''),
    });

    console.log(`E-mail enviado com sucesso para ${name}`);
    return res.status(200).json({ success: true, message: 'Dados processados com sucesso.' });

  } catch (error) {
    console.error('Erro ao enviar e-mail:', error.message);
    return res.status(500).json({ error: 'Erro ao enviar e-mail.', detail: error.message });
  }
}