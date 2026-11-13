/* ============================================================
   FUNCIONES COMPARTIDAS
   Las usan la tienda (index.html) y el panel (editor.html).
   ============================================================ */
(function (global) {
  'use strict';

  /* 1. TUS DATOS
     Aparecen al pie de cada tienda ("Quiero uno para mi negocio").
     Cámbialos aquí y se actualizan en todas las tiendas. */
  const PROVEEDOR = { nombre: 'Santiago Cortes', whatsapp: '522229549368' };

  const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const PAGOS = ['Efectivo', 'Transferencia', 'Tarjeta al recibir'];
  const COLOR_BASE = '#b3401e';

  /* 2. CREAR ELEMENTOS
     Todo el texto se inserta con textContent, nunca como HTML,
     para que ningún dato del menú pueda ejecutar código. */
  function el(etiqueta, atributos, ...hijos) {
    const nodo = document.createElement(etiqueta);
    for (const [clave, valor] of Object.entries(atributos || {})) {
      if (valor == null || valor === false) continue;
      if (clave === 'class') nodo.className = valor;
      else if (clave === 'text') nodo.textContent = valor;
      else if (clave.startsWith('on')) nodo.addEventListener(clave.slice(2), valor);
      else nodo.setAttribute(clave, valor === true ? '' : valor);
    }
    for (const hijo of hijos.flat()) {
      if (hijo != null && hijo !== false && hijo !== '') nodo.append(hijo);
    }
    return nodo;
  }

  /* 3. LIMPIEZA DE DATOS */
  function texto(valor, maximo) {
    const t = typeof valor === 'string' ? valor : valor == null ? '' : String(valor);
    return t.trim().slice(0, maximo);
  }

  function numero(valor) {
    const n = Number(valor);
    if (!Number.isFinite(n) || n < 0) return 0;
    return Math.min(1000000, Math.round(n * 100) / 100);
  }

  function objeto(valor) {
    return valor && typeof valor === 'object' && !Array.isArray(valor) ? valor : {};
  }

  function lista(valor, maximo) {
    return Array.isArray(valor) ? valor.slice(0, maximo) : [];
  }

  function hora(valor) {
    return typeof valor === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(valor) ? valor : null;
  }

  function sinAcentos(valor) {
    return String(valor).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  /* "Café La Poblana" -> "cafe-la-poblana" (sirve para el enlace y el nombre del archivo) */
  function slug(valor) {
    return sinAcentos(valor).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40).replace(/-+$/, '');
  }

  /* Deja solo dígitos; a un número de 10 dígitos le antepone el 52 de México */
  function telefono(valor) {
    const digitos = String(valor == null ? '' : valor).replace(/\D/g, '').slice(0, 15);
    return digitos.length === 10 ? '52' + digitos : digitos;
  }

  /* Solo acepta enlaces http(s) o rutas de imagen dentro del sitio */
  function rutaImagen(valor) {
    const v = texto(valor, 300);
    if (/^https?:\/\/[^\s"'<>]+$/i.test(v)) return v;
    if (/^[\w\-./]+\.(png|jpe?g|webp|gif|svg|avif)$/i.test(v)) return v;
    return '';
  }

  function color(valor) {
    return typeof valor === 'string' && /^#[0-9a-f]{6}$/i.test(valor) ? valor.toLowerCase() : COLOR_BASE;
  }

  /* Texto blanco u oscuro según qué se lea mejor sobre el color del negocio */
  function colorSobre(hex) {
    const canal = (i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const luminancia = 0.2126 * canal(1) + 0.7152 * canal(3) + 0.0722 * canal(5);
    return luminancia > 0.4 ? '#1c2434' : '#ffffff';
  }

  function producto(valor) {
    const p = objeto(valor);
    const variantes = lista(p.variantes, 12)
      .map((v) => ({ nombre: texto(objeto(v).nombre, 40), precio: numero(objeto(v).precio) }))
      .filter((v) => v.nombre);
    return {
      nombre: texto(p.nombre, 80),
      descripcion: texto(p.descripcion, 200),
      precio: numero(p.precio),
      icono: texto(p.icono, 16),
      imagen: rutaImagen(p.imagen),
      variantes,
      agotado: p.agotado === true
    };
  }

  /* Recibe cualquier archivo de negocio y devuelve uno completo y válido */
  function normalizar(valor) {
    const d = objeto(valor);
    const e = objeto(d.entrega);

    let horario = null;
    if (Array.isArray(d.horario)) {
      horario = [];
      for (let i = 0; i < 7; i++) {
        const dia = Array.isArray(d.horario[i]) ? d.horario[i] : [];
        const abre = hora(dia[0]);
        const cierra = hora(dia[1]);
        horario.push(abre && cierra ? [abre, cierra] : null);
      }
    }

    const domicilio = e.domicilio === true;
    const pagos = [];
    for (const pago of lista(d.pagos, 6)) {
      const nombre = texto(pago, 40);
      if (nombre && !pagos.includes(nombre)) pagos.push(nombre);
    }

    const nombre = texto(d.nombre, 60);
    return {
      version: 1,
      id: slug(texto(d.id, 60)) || slug(nombre),
      nombre,
      lema: texto(d.lema, 120),
      logo: texto(d.logo, 300),
      color: color(d.color),
      whatsapp: telefono(d.whatsapp),
      direccion: texto(d.direccion, 160),
      aviso: texto(d.aviso, 160),
      horario,
      entrega: {
        recoger: e.recoger !== false || !domicilio,
        domicilio,
        costoEnvio: numero(e.costoEnvio),
        pedidoMinimo: numero(e.pedidoMinimo),
        envioGratisDesde: numero(e.envioGratisDesde)
      },
      pagos: pagos.length ? pagos : ['Efectivo'],
      datosTransferencia: texto(d.datosTransferencia, 300),
      mostrarMarca: d.mostrarMarca !== false,
      categorias: lista(d.categorias, 30).map((c) => {
        const cat = objeto(c);
        return {
          nombre: texto(cat.nombre, 50) || 'Menú',
          productos: lista(cat.productos, 150).map(producto).filter((p) => p.nombre)
        };
      })
    };
  }

  /* Negocio en blanco para empezar desde cero en el panel */
  function plantilla() {
    const dia = () => ['09:00', '18:00'];
    return {
      version: 1, id: '', nombre: '', lema: '', logo: '', color: COLOR_BASE,
      whatsapp: '', direccion: '', aviso: '',
      horario: [null, dia(), dia(), dia(), dia(), dia(), dia()],
      entrega: { recoger: true, domicilio: false, costoEnvio: 0, pedidoMinimo: 0, envioGratisDesde: 0 },
      pagos: ['Efectivo'], datosTransferencia: '', mostrarMarca: true,
      categorias: [{ nombre: '', productos: [productoNuevo()] }]
    };
  }

  function productoNuevo() {
    return { nombre: '', descripcion: '', precio: 0, icono: '', imagen: '', variantes: [], agotado: false };
  }

  /* 4. DINERO Y HORARIOS */
  function dinero(cantidad) {
    const n = Math.round(Number(cantidad) * 100) / 100 || 0;
    return new Intl.NumberFormat('es-MX', {
      style: 'currency', currency: 'MXN',
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2
    }).format(n);
  }

  function minutos(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  }

  function horaCorta(hhmm) {
    return hhmm.replace(/^0/, '');
  }

  /* Dice si el negocio está abierto en este momento y cuándo cambia.
     Un cierre menor o igual a la apertura (ej. 18:00 a 02:00) cruza la medianoche. */
  function estadoHorario(horario, ahora) {
    if (!horario) return null;
    const fecha = ahora || new Date();
    const dia = fecha.getDay();
    const min = fecha.getHours() * 60 + fecha.getMinutes();
    const ayer = horario[(dia + 6) % 7];
    const hoy = horario[dia];

    if (ayer && minutos(ayer[1]) <= minutos(ayer[0]) && min < minutos(ayer[1])) {
      return { abierto: true, texto: 'Abierto · cierra a las ' + horaCorta(ayer[1]) };
    }
    if (hoy) {
      const abre = minutos(hoy[0]);
      const cierra = minutos(hoy[1]);
      if (min >= abre && (cierra <= abre || min < cierra)) {
        return { abierto: true, texto: 'Abierto · cierra a las ' + horaCorta(hoy[1]) };
      }
      if (min < abre) return { abierto: false, texto: 'Cerrado · abre hoy a las ' + horaCorta(hoy[0]) };
    }
    for (let i = 1; i <= 7; i++) {
      const siguiente = horario[(dia + i) % 7];
      if (siguiente) {
        const cuando = i === 1 ? 'mañana' : 'el ' + DIAS[(dia + i) % 7].toLowerCase();
        return { abierto: false, texto: 'Cerrado · abre ' + cuando + ' a las ' + horaCorta(siguiente[0]) };
      }
    }
    return { abierto: false, texto: 'Cerrado por ahora' };
  }

  /* Agrupa días seguidos con el mismo horario: "Lun a Vie: 9:00 a 21:00" */
  function resumenHorario(horario) {
    if (!horario) return [];
    const orden = [1, 2, 3, 4, 5, 6, 0];
    const lineas = [];
    let inicio = 0;
    for (let i = 1; i <= orden.length; i++) {
      const previo = horario[orden[i - 1]];
      const actual = i < orden.length ? horario[orden[i]] : undefined;
      const igual = actual !== undefined && String(actual) === String(previo);
      if (igual) continue;
      const dias = inicio === i - 1
        ? DIAS_CORTOS[orden[inicio]]
        : DIAS_CORTOS[orden[inicio]] + ' a ' + DIAS_CORTOS[orden[i - 1]];
      lineas.push(dias + ': ' + (previo ? horaCorta(previo[0]) + ' a ' + horaCorta(previo[1]) : 'cerrado'));
      inicio = i;
    }
    return lineas;
  }

  global.Pedidos = {
    PROVEEDOR, DIAS, PAGOS,
    el, normalizar, plantilla, productoNuevo,
    slug, sinAcentos, telefono, rutaImagen, colorSobre,
    dinero, estadoHorario, resumenHorario
  };
})(window);
