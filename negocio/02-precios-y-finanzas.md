# 2. Precios, finanzas y fórmulas

> **Nota metodológica.** Las cifras marcadas como *supuesto* son estimaciones iniciales que deben sustituirse por datos reales en cuanto existan. Las fórmulas permanecen válidas aunque cambien los números. Todas las cantidades están en pesos mexicanos (MXN).

## 2.1 Variables del modelo

| Símbolo | Significado | Valor inicial |
|---|---|---|
| *P* | Precio de un servicio | Ver catálogo |
| *h* | Horas de trabajo que requiere un servicio | Ver catálogo (*supuesto*) |
| *F* | Costos fijos mensuales del negocio (herramientas digitales, plan de IA, datos móviles, transporte base) | $900 (*supuesto*) |
| *v* | Costo variable como porcentaje del precio (aquí: reserva fiscal) | 10 % |
| *W* | Honorarios mensuales deseados por todo el equipo | $6,000 ($3,000 por persona, *supuesto*) |
| *H* | Horas facturables del equipo al mes | 80 h (2 personas × ~10 h/semana) |
| *c* | Tasa mensual de cancelación de clientes recurrentes (*churn*) | 10 % (*supuesto*) |

## 2.2 Catálogo de precios

Los precios de **lanzamiento** aplican a los primeros 3 clientes de cada línea (ya publicado en el sitio para páginas web). Después rige el precio **regular**.

| Servicio | Lanzamiento | Regular | Horas estimadas (*h*) | Tarifa efectiva lanzamiento | Tarifa efectiva regular |
|---|---:|---:|---:|---:|---:|
| Página de una sección | $900 | $1,500 | 5.0 | $180/h | $300/h |
| Plan Mensual (mantenimiento) | $250/mes | $250/mes | 0.75/mes | $333/h | $333/h |
| Ficha de Google Maps mejorada | $300 | $400 | 1.5 | $200/h | $267/h |
| Paquete de 8 publicaciones al mes | $1,000/mes | $1,200/mes | 5.0/mes | $200/h | $240/h |
| Paquete Presencia (Plan Mensual + 8 publicaciones) | $1,150/mes | $1,350/mes | 5.75/mes | $200/h | $235/h |
| Kit de marca básico | $800 | $1,200 | 4.0 | $200/h | $300/h |
| Excel: plantilla adaptada | $500 | $600 | 2.5 | $200/h | $240/h |
| Excel: herramienta a medida | $1,200 | $1,500 | 6.0 | $200/h | $250/h |
| Control mensual de ventas y gastos | $400/mes | $500/mes | 2.0/mes | $200/h | $250/h |

Los precios de publicaciones, kit de marca, Excel y control mensual son **propuesta** (aún no se publican en el sitio) y deben validarse con los primeros clientes.

### Fórmula de la tarifa efectiva por hora

$$\text{Tarifa efectiva} = \frac{P}{h}$$

**Ejemplo (página, precio regular):** $1,500 ÷ 5 h = **$300 por hora**.

Para el Plan Mensual la tarifa se calcula sobre las horas de mantenimiento mensual: $250 ÷ 0.75 h = **$333.33 por hora**. Por eso el ingreso recurrente es el más rentable por hora: una vez construida la página, mantenerla cuesta poco tiempo.

## 2.3 Tarifa mínima por hora (piso de precio)

Es el precio por hora por debajo del cual el negocio **no alcanza** a pagar honorarios y costos fijos.

$$T_{\min} = \frac{W + F}{H \cdot (1 - v)}$$

**Desglose:**

1. Necesidad mensual: *W* + *F* = $6,000 + $900 = $6,900.
2. Horas facturables ajustadas por la reserva fiscal: *H* · (1 − *v*) = 80 × 0.90 = 72.
3. *T*min = $6,900 ÷ 72 = **$95.83 por hora**.

**Interpretación.** Todos los servicios del catálogo superan ampliamente el piso ($180/h o más). Por lo tanto, **el reto del negocio no es el precio, sino el volumen de ventas**: hay que llenar las horas disponibles con clientes. Con 80 horas al mes a $200/h, la capacidad máxima teórica es de $16,000 mensuales.

## 2.4 Alerta sobre el Plan Mensual sin pago inicial

El Plan Mensual incluye la página completa sin anticipo y con plazo mínimo de 3 meses. Conviene verificar que el cliente que cancela al tercer mes no genere pérdida.

$$\text{Ingreso mínimo} = P_{\text{mensual}} \times \text{meses mínimos} = 250 \times 3 = \$750$$

$$\text{Costo en horas} = (h_{\text{página}} + h_{\text{mant}} \times 3) \times T_{\min} = (5 + 0.75 \times 3) \times 95.83 = 7.25 \times 95.83 = \$694.77$$

$$\text{Margen} = 750 - 694.77 = \$55.23$$

El margen es positivo pero muy estrecho (7.4 %). **Recomendación:** al terminar el lanzamiento, cambiar a una de estas dos opciones:

- **Opción A:** $250/mes con plazo mínimo de **6 meses** (ingreso mínimo $1,500).
- **Opción B:** $350/mes con plazo mínimo de 3 meses (ingreso mínimo $1,050).

## 2.5 Punto de equilibrio

El punto de equilibrio es el nivel de ventas en el que los ingresos cubren exactamente los costos; no hay ganancia ni pérdida (Datar y Rajan, 2018).

### En unidades (clientes del Plan Mensual)

$$Q_{eq} = \frac{F}{P - CV}$$

Donde *CV* es el costo variable por unidad = *P* · *v* = $250 × 0.10 = $25.

$$Q_{eq} = \frac{900}{250 - 25} = \frac{900}{225} = 4 \text{ clientes mensuales}$$

**Interpretación.** Con 4 clientes en Plan Mensual, las herramientas del negocio quedan pagadas. A partir del quinto cliente, todo el margen contribuye a honorarios.

### En pesos

$$R_{eq} = \frac{F}{1 - v} = \frac{900}{0.90} = \$1,000 \text{ al mes}$$

## 2.6 Regla de reparto del dinero (10 / 15 / 75)

Para evitar conflictos entre las dos personas y asegurar que siempre haya dinero para impuestos y herramientas, **cada cobro se divide en el momento en que entra**, siguiendo el principio de asignar primero la utilidad y las reservas y después el gasto (Michalowicz, 2017).

| Fondo | % del cobro | Uso |
|---|---:|---|
| Reserva fiscal y de emergencia | 10 % | ISR (RESICO), imprevistos. **No se toca para gastos ordinarios.** |
| Fondo del negocio | 15 % | Herramientas, dominio del portafolio, publicidad, transporte, equipo. |
| Honorarios del equipo | 75 % | Pago a las personas, según la fórmula siguiente. |

> **Importante:** si el negocio cobra IVA, el IVA **no es ingreso** y se separa al 100 % *antes* de aplicar la regla (ver 2.9).

### Reparto de honorarios entre las personas

$$\text{Honorarios} = 0.75 \times C$$

$$\text{Responsable de la cuenta} = 0.15 \times \text{Honorarios} = 0.1125 \times C$$

$$\text{Administración} = 0.05 \times \text{Honorarios} = 0.0375 \times C$$

$$\text{Producción} = 0.80 \times \text{Honorarios} = 0.60 \times C$$

- **Responsable de la cuenta:** quien consiguió al cliente y lo atiende.
- **Administración:** quien lleva las finanzas, la cobranza y el cierre mensual del negocio (Carlos Antonio). Se paga sobre **todos** los cobros.
- **Producción:** quien hizo el trabajo. Si ambos produjeron, el 80 % se divide en proporción a las horas registradas.

**Ejemplo 1 — Página a precio regular (*C* = $1,500):**

| Concepto | Cálculo | Monto |
|---|---|---:|
| Reserva fiscal | 1,500 × 0.10 | $150.00 |
| Fondo del negocio | 1,500 × 0.15 | $225.00 |
| Honorarios | 1,500 × 0.75 | $1,125.00 |
| → Responsable de la cuenta | 1,125 × 0.15 | $168.75 |
| → Administración | 1,125 × 0.05 | $56.25 |
| → Producción | 1,125 × 0.80 | $900.00 |

**Ejemplo 2 — Mensualidad (*C* = $250):** reserva $25.00; fondo $37.50; honorarios $187.50 (cuenta $28.13; administración $9.38; producción $150.00). Los centavos se redondean en el cierre mensual.

**Ejemplo 3 — Producción compartida.** Si en una página Santiago trabajó 3 h y Carlos Antonio trabajó 2 h, el monto de producción ($900) se divide así: Santiago 900 × 3/5 = $540; Carlos Antonio 900 × 2/5 = $360.

## 2.7 Meta de ingresos

La meta debe cumplir **dos condiciones** simultáneamente:

1. Que el 15 % del fondo del negocio cubra los costos fijos: 0.15 · *R* ≥ *F*.
2. Que el 75 % de honorarios alcance la cantidad deseada por el equipo: 0.75 · *R* ≥ *W*.

$$R_{meta} = \max\left(\frac{F}{0.15},\ \frac{W}{0.75}\right) = \max\left(\frac{900}{0.15},\ \frac{6{,}000}{0.75}\right) = \max(6{,}000;\ 8{,}000) = \$8{,}000 \text{ al mes}$$

### Una combinación de ventas que alcanza la meta (mes 6)

| Concepto | Cantidad | Precio | Ingreso | Horas |
|---|---:|---:|---:|---:|
| Clientes en Plan Mensual | 12 | $250 | $3,000 | 9.0 |
| Páginas nuevas (precio regular) | 2 | $1,500 | $3,000 | 10.0 |
| Paquete de publicaciones | 1 | $1,200 | $1,200 | 5.0 |
| Fichas de Google Maps | 2 | $400 | $800 | 3.0 |
| **Total** | | | **$8,000** | **27.0** |

Las 27 horas de producción, más un 40 % adicional para ventas y administración (27 × 1.4 = 37.8 h), ocupan menos de la mitad de la capacidad del equipo (80 h). **Hay margen para crecer** sin contratar a nadie más.

### Ingreso recurrente mensual (MRR)

$$MRR = \sum (\text{clientes recurrentes} \times \text{precio mensual}) = 12 \times 250 + 1 \times 1{,}200 = \$4{,}200$$

$$\% \text{ recurrente} = \frac{MRR}{R} = \frac{4{,}200}{8{,}000} = 52.5\,\%$$

**Objetivo:** que al menos el 50 % del ingreso sea recurrente; esto da estabilidad aunque un mes no se venda ninguna página.

## 2.8 Proyección de seis meses (escenario base)

| Mes | Plan Mensual activos | Ingreso recurrente | Ventas únicas | Otros servicios | **Total** | Fondo del negocio (15 %) | Diferencia vs. *F* ($900) |
|---:|---:|---:|---|---|---:|---:|---:|
| 1 | 2 | $500 | 3 páginas × $900 = $2,700 | — | **$3,200** | $480 | −$420 |
| 2 | 4 | $1,000 | 1 × $1,500 = $1,500 | 1 ficha Maps $400 | **$2,900** | $435 | −$465 |
| 3 | 6 | $1,500 | 2 × $1,500 = $3,000 | 1 Excel $600 | **$5,100** | $765 | −$135 |
| 4 | 8 | $2,000 | 2 × $1,500 = $3,000 | Publicaciones $1,200 | **$6,200** | $930 | +$30 |
| 5 | 10 | $2,500 | 2 × $1,500 = $3,000 | Publicaciones $1,200 + Maps $400 | **$7,100** | $1,065 | +$165 |
| 6 | 12 | $3,000 | 2 × $1,500 = $3,000 | Publicaciones $1,200 + 2 Maps $800 | **$8,000** | $1,200 | +$300 |
| **Total** | | | | | **$32,500** | **$4,875** | **−$525** |

**Lectura de la proyección:**

- Ingreso acumulado: $32,500; honorarios acumulados: 32,500 × 0.75 = **$24,375**.
- Los meses 1 a 3 tienen un déficit en el fondo del negocio de 420 + 465 + 135 = **$1,020**. Ese es el **capital de arranque** necesario. Se cubre con una aportación inicial o reduciendo los costos fijos a lo indispensable durante el primer trimestre.

$$\text{Capital de arranque} = \sum_{m=1}^{3} \max(0,\ F - 0.15 \cdot R_m) = 420 + 465 + 135 = \$1{,}020$$

## 2.9 Impuestos: IVA y RESICO (consultar con un contador)

### IVA

Si el negocio está obligado a trasladar IVA (tasa general del 16 %), debe decidirse si los precios publicados lo **incluyen** o se cobran **más IVA**.

$$P_{\text{sin IVA}} = \frac{P_{\text{con IVA}}}{1.16} \qquad \text{IVA} = P_{\text{con IVA}} - P_{\text{sin IVA}}$$

**Ejemplo:** si $900 incluye IVA → *P* sin IVA = 900 ÷ 1.16 = $775.86; IVA = $124.14 (13.79 % del precio cobrado). Si el precio se cobra *más IVA*, el cliente paga 900 × 1.16 = $1,044.

### ISR en el Régimen Simplificado de Confianza (RESICO), personas físicas

En el RESICO, el ISR mensual se calcula aplicando una tasa al total de los ingresos efectivamente cobrados en el mes, sin deducciones (Ley del Impuesto sobre la Renta [LISR], 2013, art. 113-E):

| Ingresos cobrados en el mes (hasta) | Tasa |
|---:|---:|
| $25,000.00 | 1.00 % |
| $50,000.00 | 1.10 % |
| $83,333.33 | 1.50 % |
| $208,333.33 | 2.00 % |
| $3,500,000.00 (anual) | 2.50 % |

$$ISR_{\text{mensual}} = \text{Ingresos cobrados del mes (sin IVA)} \times \text{tasa}$$

**Ejemplo:** si una persona cobra $4,000 en el mes → ISR = 4,000 × 0.01 = **$40**.

Cuando el cliente es una persona moral (empresa), esta retiene el 1.25 % del ingreso sin IVA (LISR, 2013, art. 113-J).

**Conclusión práctica:** la reserva fiscal del 10 % cubre con holgura el ISR del RESICO (1 % en el rango actual) y deja un colchón para emergencias. **Si se cobra IVA, ese IVA se separa aparte**; el 10 % no alcanza para cubrirlo.

> Cada persona del equipo que reciba ingresos debe estar dada de alta en el SAT. La forma jurídica (dos personas físicas que se facturan entre sí, o una sociedad) se decide al cierre de los 90 días (ver documento 3). Este apartado es orientativo y **no sustituye la asesoría de un contador**.

## 2.10 Indicadores financieros de clientes

### Permanencia promedio y valor de vida del cliente (LTV)

$$\text{Permanencia promedio (meses)} = \frac{1}{c} = \frac{1}{0.10} = 10 \text{ meses}$$

$$LTV = P_{\text{mensual}} \times (1 - v) \times \text{Permanencia} = 250 \times 0.90 \times 10 = \$2{,}250$$

### Costo de adquisición de clientes (CAC)

$$CAC = \frac{\text{Gastos de adquisición} + (\text{horas de venta} \times T_{\min})}{\text{Clientes nuevos}}$$

**Ejemplo:** $200 de transporte + 6 h de prospección × $95.83 = $774.98; si se consiguieron 2 clientes → CAC = 774.98 ÷ 2 = **$387.49**.

### Relación LTV/CAC

$$\frac{LTV}{CAC} = \frac{2{,}250}{387.49} = 5.81$$

**Regla:** una relación mayor que 3 indica que adquirir clientes es rentable. Si baja de 3, hay que revisar el proceso de venta o el precio.
