# sua · Sitio web (ES · EN · PT · FR)

Sitio estático listo para GitHub + Vercel. No necesita instalar nada ni compilar.
Funciona **ya**, sin links de pago y sin base de datos: los botones de compra llevan
a un formulario de reserva y el formulario abre el correo del visitante con el mensaje listo.

| Página | Ruta |
|---|---|
| Landing | `/` |
| Auditor (MVP) | `/app` |
| Después del pago | `/gracias` |
| Privacidad y términos | `/legal` |
| Error | cualquier ruta que no exista |

El idioma se elige solo (según el navegador) y se cambia con los botones ES · EN · PT · FR.
También se puede forzar: `/?lang=pt`, `/app?lang=fr`, `/gracias?lang=en`.

---

## El orden correcto (rompe el círculo Polar ↔ web)

**Paso 1 · Publicar la web (sin links de pago)**
1. GitHub → **New repository** → nombre `sua-web` → Public o Private → **Create**.
2. En el repo vacío: **uploading an existing file** → arrastra **todo el contenido** de esta carpeta
   (no la carpeta en sí: `index.html` debe quedar en la raíz) → **Commit changes**.
3. vercel.com → **Add New… → Project** → importa `sua-web` → Framework: **Other** → **Deploy**.
4. Copia tu URL, por ejemplo `https://sua-web.vercel.app`. Ya tienes web.

**Paso 2 · Crear los checkout links en Polar**
1. Entra a **polar.sh** (producción). No uses `sandbox.polar.sh`: el sandbox es el que muestra
   el aviso amarillo de "modo de prueba".
2. Por cada producto (Evals Pack y AI Ownership Audit) crea un **Checkout Link**.
3. En **Success URL** pega (con tu URL real):
   `https://sua-web.vercel.app/gracias?checkout_id={CHECKOUT_ID}`
4. Copia cada link (`https://buy.polar.sh/...`).

**Paso 3 · Pegar los links (sin zip nuevo)**
1. En GitHub abre `config.js` → lápiz ✏️.
2. Pega los links en `polar.evals` y `polar.audit` → **Commit changes**.
3. Vercel se actualiza solo en ~1 minuto. Listo: los botones ya cobran.

Lo mismo para `cal` (Cal.com), `substack` y la base de datos de leads: **todo se cambia en `config.js`**.

---

## Dónde guardar los leads del formulario (todo gratis)

| Opción | Dificultad | Cómo ves los datos | Nota |
|---|---|---|---|
| `email` (por defecto) | Ninguna | Te llega un correo cuando el visitante lo envía | Depende de que el visitante pulse "enviar" en su correo |
| **`sheets` (recomendada)** | Fácil, 5 min | **Una hoja de Google Sheets**, como un Excel, que se llena sola + aviso por correo | Sin servidor, sin tarjeta |
| `firebase` | Media, 10 min | Consola de Firebase (Firestore) | Plan Spark gratis |
| `supabase` | Media, 10 min | Panel de Supabase | El plan gratis se pausa si pasa una semana sin actividad |

Si la opción elegida falla, el formulario cae automáticamente al correo: **nunca se pierde un lead**.

### Opción recomendada · Google Sheets
1. Abre `setup/google-sheets-leads.gs` y sigue las 6 instrucciones de arriba del archivo.
2. En `config.js`: `provider: "sheets"` y pega la URL `.../exec` en `sheetsUrl`.

### Opción · Firebase (Firestore)
1. console.firebase.google.com → **Agregar proyecto** (desactiva Analytics si quieres) → plan **Spark** (gratis).
2. Menú **Compilación → Firestore Database → Crear base de datos** → modo **producción** → región cercana (ej. `southamerica-east1` o `us-central1`).
3. **Dónde pegar la seguridad:** dentro de Firestore Database, pestaña **Reglas** → borra todo →
   pega el contenido de `setup/firestore.rules` → **Publicar**.
4. ⚙️ **Configuración del proyecto** → copia el **ID del proyecto** y la **Clave de API web** (Web API Key).
   Si no aparece la clave, en la misma pantalla agrega una app **Web (</>)** y aparecerá.
5. En `config.js`: `provider: "firebase"`, `firebaseProjectId` y `firebaseApiKey`.
6. Los leads aparecen en Firestore → colección `leads`.

> La clave web de Firebase es pública por diseño; lo que protege los datos son las reglas del paso 3
> (la web solo puede **crear** leads, nadie puede leerlos desde internet).
> El **login** de Firebase (Authentication) **no hace falta** para esto; se activará cuando el auditor tenga cuentas de usuario.

### Opción · Supabase
1. supabase.com → New project (plan Free).
2. **SQL Editor** → pega `setup/supabase-leads.sql` → **Run**.
3. **Project Settings → API** → copia `Project URL` y la clave `anon public`.
4. En `config.js`: `provider: "supabase"`, `supabaseUrl`, `supabaseAnonKey`.

---

## Antes de compartir la web
- [ ] Cambia `legalName` en `config.js` por el nombre exacto de tu LLC.
- [ ] Revisa `/legal` con un abogado o contador (es una plantilla general, no asesoría legal).
- [ ] La garantía de reembolso del 100 % aparece en precios y términos: si no la quieres, avísame y la quito.
- [ ] Dominio propio (opcional): Vercel → Project → Settings → Domains.

## Archivos
```
index.html      landing (4 idiomas)
app.html        auditor sua (MVP, 4 idiomas)
gracias.html    página de éxito de Polar
legal.html      privacidad y términos
404.html        error
config.js       ← lo único que editas
vercel.json     rutas limpias y cabeceras de seguridad
robots.txt
assets/         logo, avatar y imagen para compartir (og.png)
setup/          Google Sheets, reglas de Firebase, SQL de Supabase
```
