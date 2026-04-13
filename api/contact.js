import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Configurar CORS (Vercel Functions já lidam com isso bem, mas vamos garantir POST)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  const { name, contact, service, message } = req.body;

  if (!name || !contact || !service) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
  }

  try {
    // 1. Inicializa Supabase
    // No Vercel, as variáveis devem estar no Dashboard
    const supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_KEY || ''
    );

    // Salvar no Supabase
    const { error: dbError } = await supabase
      .from('users_mensange')
      .insert([{ name, contact, service, message }]);

    if (dbError) {
      console.error('Erro ao salvar no Supabase:', dbError);
      // Continuamos mesmo se o Supabase falhar, para tentar enviar o e-mail
    }

    // 2. Configuração do transportador de e-mail e envio
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) == 465,
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

    await transporter.sendMail({
      from: `"Portfólio - Eliel Nicolas" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Solicitação de Orçamento - ${name}`,
      html: body,
      text: body.replace(/<[^>]*>/g, ''),
    });

    return res.status(200).json({ success: true, message: 'Dados processados com sucesso.' });
  } catch (error) {
    console.error('Erro detalhado no processamento:', error);
    return res.status(500).json({
      error: 'Erro ao processar sua solicitação.',
      debug: error.message
    });
  }
}
