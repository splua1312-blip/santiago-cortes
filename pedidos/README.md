# Pedidos por WhatsApp

Menú digital para negocios locales: el cliente arma su pedido en el celular y lo envía
al WhatsApp del negocio. Un solo sitio atiende a todos los negocios; cada uno es un archivo.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | La tienda que ve el cliente. El negocio se elige en el enlace: `?n=demo` lee `negocios/demo.json`. |
| `editor.html` | El panel para capturar un menú, verlo en vista previa y descargar su archivo. |
| `comun.js` | Funciones compartidas. Aquí están tu nombre y tu WhatsApp (`PROVEEDOR`), que salen al pie de cada tienda. |
| `negocios/` | Un archivo `.json` por negocio. `demo.json` es el ejemplo. |
| `lib/qrcode.js` | Generador del código QR (qrcode-generator, licencia MIT). |

## Dar de alta un negocio

1. Abre `editor.html` y captura los datos, el horario, la entrega y el menú.
2. Presiona **Descargar archivo**. Se descarga, por ejemplo, `cafe-la-poblana.json`.
3. Sube ese archivo a la carpeta `pedidos/negocios/`.
4. Comparte el enlace `.../pedidos/?n=cafe-la-poblana` o el código QR que da el panel.

Para cambiar precios o productos: en el panel presiona **Abrir archivo**, elige el `.json`
del negocio, edítalo, descárgalo y súbelo de nuevo con el mismo nombre.

## Qué hace y qué no

- Los pedidos llegan como mensaje de WhatsApp; el negocio los confirma en el chat.
- No cobra en línea ni guarda pedidos: no hay servidor ni base de datos.
- El pedido de demostración llega a tu WhatsApp, así cada prueba es un posible cliente.
- Para abrirlo en tu computadora necesita un servidor local (por ejemplo `python3 -m http.server`);
  con doble clic sobre el archivo el navegador bloquea la lectura del menú.

## Dónde publicarlo

GitHub Pages sirve para mostrar la demostración, pero sus condiciones no permiten usarlo
para operar un negocio en línea ni un servicio comercial. Para clientes que pagan, publica
esta carpeta en un alojamiento que sí lo permita (por ejemplo Netlify o Cloudflare Pages);
funciona igual porque son solo archivos estáticos.
