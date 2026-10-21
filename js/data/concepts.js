/* ══════════════════════════════════════════════════════════════════════════
   BIBLIOTECA DE CONCEPTOS (Bug Hunter Academy & TiendaVirtus)
   - Programación (Python, HTML, CSS, JavaScript)
   - Electrónica y Circuitos Físicos
   - Arduino y Microcontroladores
   - Sensores y Actuadores
   ══════════════════════════════════════════════════════════════════════════ */
const CONCEPTS = [
  // ─── PROGRAMACIÓN & DESARROLLO WEB ───
  {
    id: 'py_intro', cat: 'prog', icon: '🐍', lang: 'Python', nivel: 'Básico',
    titulo: 'Fundamentos de Python & Indentación',
    desc: 'Python utiliza bloques delimitados por sangría (4 espacios) en lugar de llaves, garantizando código limpio y legible.',
    ejemplo: '# Estructura limpia en Python\ndef verificar_sistema(voltaje):\n    if voltaje >= 5.0:\n        print("Voltaje nominal OK")\n    else:\n        print("Falla de alimentación")',
    detalles: 'En Python la indentación no es estética, es sintaxis obligatoria. Si un bloque dentro de un if o una función no está correctamente sangrado, el intérprete lanzará un IndentationError. Esta disciplina enseña estructura lógica rigurosa.'
  },
  {
    id: 'html_dom', cat: 'prog', icon: '🌐', lang: 'HTML', nivel: 'Básico',
    titulo: 'Estructura Jerárquica del DOM (HTML)',
    desc: 'El árbol de elementos HTML define la estructura semántica de cualquier interfaz gráfica o panel de monitoreo IoT.',
    ejemplo: '<!-- Tarjeta de sensor -->\n<div class="sensor-card">\n  <h3>Sensor de Temperatura</h3>\n  <span id="temp-val">24.5 °C</span>\n</div>',
    detalles: 'HTML organiza los componentes mediante etiquetas de apertura y cierre anidadas. En Bug Hunter Academy vinculamos los datos leídos por los sensores de Arduino con elementos del DOM mediante JavaScript.'
  },
  {
    id: 'css_flexbox', cat: 'prog', icon: '🎨', lang: 'CSS', nivel: 'Básico',
    titulo: 'Estilos y Maquetación con CSS',
    desc: 'Reglas de estilo que controlan colores, tipografía, espaciado y disposición visual flexible mediante Flexbox y Grid.',
    ejemplo: '/* Panel de telemetría */\n.dashboard-panel {\n  display: flex;\n  justify-content: space-between;\n  padding: 16px;\n  background: #0b1326;\n  border-radius: 12px;\n}',
    detalles: 'CSS transforma la estructura pura de HTML en tableros legibles y atractivos. El uso de variables CSS (como --green-neon) facilita alternar entre temas oscuros y claros manteniendo el contraste accesible.'
  },
  {
    id: 'js_events', cat: 'prog', icon: '⚡', lang: 'JavaScript', nivel: 'Intermedio',
    titulo: 'Eventos Asíncronos & Callbacks (JS)',
    desc: 'Mecanismo que permite a las aplicaciones responder en tiempo real a pulsaciones de botones o lecturas de sensores.',
    ejemplo: '// Captura de clic en botón de emergencia\nconst btn = document.getElementById("btn-paro");\nbtn.addEventListener("click", () => {\n  apagarMotores();\n  console.warn("Paro de emergencia activado");\n});',
    detalles: 'JavaScript es el motor dinámico que orquesta la simulación en Bug Hunter Academy: evalúa las reglas lógicas, anima los LEDs y valida las condiciones de victoria de cada misión.'
  },
  {
    id: 'var', cat: 'prog', icon: '📦', lang: 'General', nivel: 'Básico',
    titulo: 'Variables y Tipado de Datos',
    desc: 'Contenedores en memoria nombrados para almacenar datos numéricos, cadenas de texto y valores booleanos.',
    ejemplo: 'let nombreAgente = "Alan";\nlet nivelAcceso = 3;\nlet sistemaActivo = true;',
    detalles: 'Las variables permiten recordar estados. En sistemas embebidos, elegir el tipo de dato correcto (byte, int, float) ahorra memoria RAM crítica en el microcontrolador.'
  },
  {
    id: 'cond', cat: 'prog', icon: '🔀', lang: 'General', nivel: 'Básico',
    titulo: 'Condicionales (if / else if / else)',
    desc: 'Estructuras de decisión lógica que bifurcan la ruta de ejecución según si una expresión booleana es verdadera o falsa.',
    ejemplo: 'if (temperatura > 80) {\n  activarCooler();\n} else if (temperatura > 60) {\n  alertaPreventiva();\n} else {\n  modoReposo();\n}',
    detalles: 'Las bifurcaciones son el núcleo de cualquier sistema automático. Detectar un error de condición invertida (por ejemplo > en vez de <) es uno de los desafíos centrales del cazador de bugs.'
  },
  {
    id: 'bucles', cat: 'prog', icon: '🔄', lang: 'General', nivel: 'Intermedio',
    titulo: 'Bucles de Repetición (for / while)',
    desc: 'Estructuras iterativas para ejecutar tareas secuenciales sin duplicar código innecesariamente.',
    ejemplo: '// Parpadear LED 5 veces\nfor (let i = 0; i < 5; i++) {\n  digitalWrite(13, HIGH);\n  delay(200);\n  digitalWrite(13, LOW);\n  delay(200);\n}',
    detalles: 'Un bucle infinito accidental (while (true) sin condición de escape) congela el procesador. En robótica usamos temporizadores no bloqueantes (millis()) para evitar este inconveniente.'
  },
  {
    id: 'func', cat: 'prog', icon: '⚙️', lang: 'General', nivel: 'Intermedio',
    titulo: 'Funciones Modulares',
    desc: 'Bloques de código encapsulados que reciben parámetros, realizan una tarea concreta y devuelven un resultado.',
    ejemplo: 'function calcularVoltaje(lecturaAnalogica) {\n  return (lecturaAnalogica * 5.0) / 1023.0;\n}',
    detalles: 'La modularidad permite aislar bugs: si la lectura de un sensor da un valor anómalo, la función de conversión matemática es el primer punto a inspeccionar.'
  },

  // ─── ELECTRÓNICA & CIRCUITOS ───
  {
    id: 'circuito', cat: 'elec', icon: '⚡', lang: 'Electrónica', nivel: 'Básico',
    titulo: 'Circuito Eléctrico Cerrado',
    desc: 'Trayectoria continua que permite a los electrones fluir desde el polo positivo (+5V) hasta el retorno a tierra (GND).',
    ejemplo: '+5V (Fuente) ➔ Resistencia limitadora (220Ω) ➔ Ánodo LED ➔ Cátodo LED ➔ GND (Tierra)',
    detalles: 'Si el circuito se abre en cualquier punto (cable desconectado, pista cortada o interruptor abierto), la corriente cae instantáneamente a cero y los componentes se apagan.'
  },
  {
    id: 'ohm', cat: 'elec', icon: '📐', lang: 'Electrónica', nivel: 'Intermedio',
    titulo: 'Ley de Ohm (V = I · R)',
    desc: 'Relación fundamental entre Voltaje (V, Voltios), Corriente (I, Amperios) y Resistencia (R, Ohmios).',
    ejemplo: 'R = (V_fuente - V_led) / I\nR = (5V - 2V) / 0.02A = 150Ω (mínimo seguro: 220Ω)',
    detalles: 'Sin la resistencia limitadora, la corriente que atraviesa el diodo superaría los 100mA, fundiendo la unión semiconductora en milisegundos.'
  },
  {
    id: 'resistencia', cat: 'elec', icon: '🪨', lang: 'Electrónica', nivel: 'Básico',
    titulo: 'Resistencias y Código de Colores',
    desc: 'Componentes pasivos que oponen resistencia controlada al flujo de corriente. Su valor se lee por bandas cromáticas.',
    ejemplo: 'Resistencia 220Ω:\n1ª banda: Rojo (2)\n2ª banda: Rojo (2)\n3ª banda: Marrón (x10)\n4ª banda: Dorado (±5%)',
    detalles: 'Las resistencias no tienen polaridad: pueden conectarse en cualquier sentido. Son indispensables tanto para proteger LEDs como para configurar pines con resistencias pull-up o pull-down.'
  },
  {
    id: 'led', cat: 'elec', icon: '💡', lang: 'Electrónica', nivel: 'Básico',
    titulo: 'Diodo LED y Polaridad',
    desc: 'Diodo semiconductor que emite luz cuando se polariza en directa. Cuenta con dos terminales: Ánodo (+) y Cátodo (-).',
    ejemplo: 'Ánodo (pata larga, cara curva) ➔ Hacia el positivo (+)\nCátodo (pata corta, chaflán plano) ➔ Hacia GND (-)',
    detalles: 'Si un LED se conecta al revés (polarización inversa), no emitirá luz pero actuará como un circuito abierto. Nunca debe conectarse directo a 5V sin resistencia.'
  },
  {
    id: 'proto', cat: 'elec', icon: '🧩', lang: 'Protoboard', nivel: 'Intermedio',
    titulo: 'Protoboard (Placa de Pruebas)',
    desc: 'Matriz de inserción rápida sin soldadura. Rieles laterales continuos para alimentación y columnas de 5 orificios unidas por filas.',
    ejemplo: '• Riel Rojo (+): Continuo de extremo a extremo (+5V)\n• Riel Azul (-): Continuo de extremo a extremo (GND)\n• Terminales centrales (a, b, c, d, e): Conectados entre sí',
    detalles: 'El canal central aísla los dos lados de la protoboard, permitiendo montar circuitos integrados (chips DIP) con sus pines opuestos sin generar cortocircuito.'
  },

  // ─── ARDUINO & MICROCONTROLADORES ───
  {
    id: 'ard_setup', cat: 'ard', icon: '🔌', lang: 'Arduino C++', nivel: 'Básico',
    titulo: 'Ciclo de Vida de Arduino: setup() y loop()',
    desc: 'Estructura obligatoria de todo sketch de Arduino. setup() corre una sola vez al encender; loop() itera indefinidamente.',
    ejemplo: 'void setup() {\n  pinMode(13, OUTPUT); // Se ejecuta una sola vez\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(500);\n  digitalWrite(13, LOW);\n  delay(500);\n}',
    detalles: 'En el setup() configuramos la velocidad del puerto serie (Serial.begin) y el modo de los pines. En el loop() programamos la lógica de monitoreo continua.'
  },
  {
    id: 'digital_io', cat: 'ard', icon: '🎛️', lang: 'Arduino C++', nivel: 'Básico',
    titulo: 'Pines Digitales (pinMode, digitalRead, digitalWrite)',
    desc: 'Pines configurables que solo operan con dos estados de tensión: HIGH (5V) o LOW (0V / Tierra).',
    ejemplo: 'pinMode(7, INPUT_PULLUP); // Pin de entrada con pull-up\npinMode(8, OUTPUT);       // Pin de salida\n\nint estado = digitalRead(7);\ndigitalWrite(8, !estado);',
    detalles: 'Olvidar declarar el pinMode(pin, OUTPUT) es uno de los bugs más comunes: el pin quedará como INPUT flotante y el LED apenas emitirá un brillo tenue e inestable.'
  },
  {
    id: 'analog_io', cat: 'ard', icon: '📊', lang: 'Arduino C++', nivel: 'Intermedio',
    titulo: 'Lecturas Analógicas (ADC & analogRead)',
    desc: 'Conversión de voltajes continuos (0V a 5V) a números enteros discretos de 10 bits (rango de 0 a 1023).',
    ejemplo: 'int lectura = analogRead(A0); // Rango 0..1023\nfloat tension = lectura * (5.0 / 1023.0);\nSerial.print("Tensión: ");\nSerial.println(tension);',
    detalles: 'Los pines A0-A5 incorporan un conversor analógico-digital (ADC). Permiten leer sensores variables como potenciómetros, fotorresistencias (LDR) o sensores de temperatura analógicos.'
  },
  {
    id: 'pwm', cat: 'ard', icon: '🌊', lang: 'Arduino C++', nivel: 'Avanzado',
    titulo: 'Modulación por Ancho de Pulsos (PWM & analogWrite)',
    desc: 'Simula voltajes analógicos intermedios variando el ciclo de trabajo de una onda cuadrada de alta velocidad.',
    ejemplo: '// Atenuar brillo de un LED suavemente\nfor (int brillo = 0; brillo <= 255; brillo++) {\n  analogWrite(9, brillo); // Pin con símbolo ~ (PWM)\n  delay(5);\n}',
    detalles: 'Arduino Uno soporta PWM en los pines marcados con una virgulilla: 3, 5, 6, 9, 10 y 11 con valores entre 0 (0% ciclo) y 255 (100% ciclo).'
  },

  // ─── SENSORES & DETECCIÓN ───
  {
    id: 'btn', cat: 'sens', icon: '🔘', lang: 'Electrónica', nivel: 'Básico',
    titulo: 'Pulsador y Rebotes Mecánicos (Debounce)',
    desc: 'Interruptor momentáneo que cierra el circuito al ser presionado. Requiere resistencia pull-down o pull-up.',
    ejemplo: '// Lectura con resistencia pull-down externa\nint boton = digitalRead(2);\nif (boton == HIGH) {\n  // Botón presionado\n}',
    detalles: 'Al pulsar mecánicamente dos chapas de metal, se producen micro-rebotes de contacto durante unos 10 milisegundos. En software se aplica un filtro anti-rebote (debounce) para contar un solo pulso limpio.'
  },
  {
    id: 'ldr', cat: 'sens', icon: '☀️', lang: 'Sensores', nivel: 'Básico',
    titulo: 'Sensor LDR (Fotorresistencia)',
    desc: 'Sensor óptico cuya resistencia eléctrica disminuye drásticamente a medida que aumenta la luz ambiental.',
    ejemplo: 'int nivelLuz = analogRead(A0);\nif (nivelLuz < 300) {\n  digitalWrite(13, HIGH); // Noche: encender farola\n}',
    detalles: 'Para conectar un LDR a un pin analógico se forma un circuito divisor de tensión con una resistencia fija de 10kΩ, transformando la variación de resistencia en una señal de voltaje medible.'
  },
  {
    id: 'pot', cat: 'sens', icon: '🎛️', lang: 'Sensores', nivel: 'Básico',
    titulo: 'Potenciómetro (Resistencia Variable)',
    desc: 'Resistor ajustable de tres terminales. El terminal central entrega un voltaje proporcional a la rotación del eje.',
    ejemplo: 'int valorGiro = analogRead(A1); // 0 a 1023\nint angulo = map(valorGiro, 0, 1023, 0, 180);',
    detalles: 'Conectando los extremos a 5V y GND, el cursor central barre el rango completo de 0V a 5V. Es ideal para control de volumen, calibración de umbrales y mandos de velocidad.'
  },

  // ─── ACTUADORES & SALIDAS ───
  {
    id: 'buzzer', cat: 'act', icon: '🔊', lang: 'Actuadores', nivel: 'Básico',
    titulo: 'Buzzer Acústico (Zumbador Piezoeléctrico)',
    desc: 'Dispositivo electroacústico que convierte señales eléctricas en ondas sonoras audibles.',
    ejemplo: '// Generar tono de alarma a 1000 Hz por 300ms\ntone(8, 1000, 300);\ndelay(400);\ntone(8, 1500, 300);',
    detalles: 'Existen dos tipos: activos (emiten tono fijo al recibir 5V directo) y pasivos (requieren una frecuencia PWM generada con la función tone() de Arduino para tocar notas musicales).'
  },
  {
    id: 'lcd1602', cat: 'act', icon: '📟', lang: 'Actuadores', nivel: 'Intermedio',
    titulo: 'Display LCD 16x2 (Módulo I2C)',
    desc: 'Pantalla de cristal líquido con retroiluminación capaz de mostrar 2 líneas de 16 caracteres alfanuméricos.',
    ejemplo: '#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27, 16, 2);\n\nlcd.init();\nlcd.backlight();\nlcd.setCursor(0, 0);\nlcd.print("Bug Hunter Acad");',
    detalles: 'La interfaz I2C reduce el cableado de 16 cables a únicamente 4 (VCC, GND, SDA y SCL), simplificando notablemente los proyectos con microcontroladores.'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONCEPTS };
}