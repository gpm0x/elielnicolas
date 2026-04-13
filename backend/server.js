import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Inicializa Supabase
const supabase = createClient(
  process.env.ARMAZENAR_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.ARMAZENAR_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || ''
);

app.use(cors());
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.post('/api/contact', async (req, res) => {
  const { name, contact, service, message } = req.body;

  if (!name || !contact || !service) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
  }

  try {
    // 1. Salvar no Supabase
    const { error: dbError } = await supabase
      .from('users_mensange')
      .insert([
        { name, contact, service, message }
      ]);

    if (dbError) {
      console.error('Erro ao salvar no Supabase:', dbError);
      // Continuamos mesmo se o Supabase falhar, para tentar enviar o e-mail
    } else {
      console.log('Lead salvo no Supabase com sucesso.');
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

    console.log(`E-mail enviado com sucesso para ${name}`);
    res.status(200).json({ success: true, message: 'Dados processados com sucesso.' });
  } catch (error) {
    console.error('Erro detalhado no processamento:', {
      message: error.message,
      stack: error.stack,
      details: error
    });
    res.status(500).json({
      error: 'Erro ao processar sua solicitação.',
      debug: error.message // Temporarily expose for easier debugging
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
