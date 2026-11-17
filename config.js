/* ============================================================
   sua · CONFIGURACIÓN DEL SITIO
   Este es el ÚNICO archivo que necesitas editar.
   Edítalo directo en GitHub (lápiz ✏️ → "Commit changes")
   y Vercel actualiza la web solo en ~1 minuto. No hace falta otro zip.

   Si un campo queda vacío "", la web sigue funcionando:
   - Sin links de Polar → los botones de compra llevan al formulario
     de reserva (el cliente deja sus datos y tú le mandas el link).
   - Sin base de datos → el formulario abre el correo del visitante
     con el mensaje listo para enviarte.
   ============================================================ */
window.SUA_CONFIG = {

  // Correo de contacto (aparece en el pie de página y recibe las reservas)
  email: "manyosa@limly.io",

  // Nombre legal de tu LLC (aparece en Privacidad y Términos)
  legalName: "sua",   // ej. "Sua Labs LLC"

  // PASO 2 · Links de checkout de Polar (créalos en polar.sh, NO en sandbox)
  // Success URL que debes poner en Polar:  https://TU-DOMINIO/gracias?checkout_id={CHECKOUT_ID}
  polar: {
    evals: "",   // Evals Pack $99      → ej. "https://buy.polar.sh/polar_cl_xxxx"
    audit: ""    // AI Ownership Audit  → ej. "https://buy.polar.sh/polar_cl_yyyy"
  },

  // Agenda de 15 min (Cal.com gratis). Vacío = el botón abre un correo.
  cal: "",       // ej. "https://cal.com/tu-usuario/15min"

  // Newsletter. Vacío = el botón se oculta.
  substack: "",  // ej. "https://tunewsletter.substack.com"

  // PASO 3 · Dónde guardar los leads del formulario (elige UNO, todos gratis)
  // "email"    → abre el correo del visitante (funciona ya, sin configurar nada)
  // "sheets"   → Google Sheets (recomendado: lo ves como un Excel). Ver README.
  // "firebase" → Firestore. Ver README.
  // "supabase" → Supabase. Ver README.
  leads: {
    provider: "email",
    sheetsUrl: "",            // URL de la Web App de Google Apps Script (termina en /exec)
    firebaseProjectId: "",    // ej. "sua-12345"
    firebaseApiKey: "",       // "Web API Key" del proyecto (es pública, la protegen las reglas)
    supabaseUrl: "",          // ej. "https://xxxx.supabase.co"
    supabaseAnonKey: ""       // clave "anon public"
  }
};
