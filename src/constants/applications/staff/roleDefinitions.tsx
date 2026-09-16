const roleDefinitions = [
  {
    id: 1,
    title: 'Coordinador(a) de Comunicaciones',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>
          <strong>Funciones Principales:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Estrategia y Calendario Editorial:</strong> diseñar y administrar el plan de
              comunicaciones del preuniversitario. Decidir qué, cuándo y en qué canal (Instagram,
              LinkedIn, correos masivos) se lanza la información para alinearla con los hitos
              académicos y logísticos del año.
            </li>
            <li>
              <strong>Redacción Estratégica:</strong> traducir la información técnica de la
              directiva en textos atractivos y claros para los estudiantes o autoridades
              universitarias. Ser autor(a) de los comunicados oficiales, textos de redes sociales y
              correos.
            </li>
            <li>
              <strong>Actuar como recolector(a) de la materia prima:</strong> extraer proactivamente
              la información de otras áreas (por ejemplo, consultar plazos de matrícula a Finanzas)
              para transformarlos en un brief o requerimiento de texto listo.
            </li>
            <li>
              <strong>Gestión de Comunidad:</strong> monitorear la interacción en los canales
              digitales, canalizar dudas simples y derivar problemas complejos o personales.
            </li>
          </ul>
        </li>
        <li>
          <strong>Perfil Requerido:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Redacción y Ortografía Impecable:</strong> excelente dominio gramatical y
              capacidad para adaptar el tono comunicacional dependiendo del receptor (formal para
              autoridades, cercano para estudiantes).
            </li>
            <li>
              <strong>Planificación Metódica:</strong> estricto manejo de tiempos y fechas para
              evitar que la comunicación oficial de la organización opere en base a la improvisación
              de último minuto.
            </li>
            <li>
              <strong>Insistencia Resolutiva:</strong> habilidad para hacer seguimiento a las otras
              áreas del preuniversitario hasta conseguir la información necesaria para armar las
              publicaciones.
            </li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    id: 2,
    title: 'Coordinador(a) de Equipo',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>
          <strong>Funciones Principales:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Monitoreo de Retención y Prevención de Burnout:</strong> hacer seguimiento
              activo del estado anímico de los voluntarios (profesores, logística, diseño, etc.).
              Detectar a tiempo si alguien está a punto de renunciar por estrés de sus propios ramos
              universitarios y buscar soluciones de flexibilidad antes de que sea crítico.
            </li>
            <li>
              <strong>Producción de Eventos y Hospitalidad:</strong> presupuestar, planificar y
              ejecutar la logística de las instancias de cohesión (como &quot;oncesitas&quot;,
              jornadas de inicio y convivencias). Ser dueño(a) de la &quot;logística humana&quot;,
              encargándose de compras estratégicas de colaciones y preparación del ambiente.
            </li>
            <li>
              <strong>Ejecución Operativa de Capacitaciones:</strong> trabajar en dupla con la
              Directiva. Mientras esta define qué se va a enseñar en una charla (ej. traer a un
              profesor veterano), Coordinación de Equipo ejecuta el cómo: reserva las salas físicas,
              envía las citaciones de calendario y prepara el entorno.
            </li>
            <li>
              <strong>Recepción del Voluntariado:</strong> asegurar que cada voluntario nuevo no
              solo reciba sus accesos digitales o herramientas, sino que se sienta bienvenido,
              entienda la visión del proyecto y se integre a la comunidad.
            </li>
          </ul>
        </li>
        <li>
          <strong>Perfil Requerido:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Empatía Estratégica:</strong> alta inteligencia emocional para leer el clima
              del grupo, escuchar activamente y acercarse de manera oportuna a quienes están
              desmotivados.
            </li>
            <li>
              <strong>Habilidad de Producción y Autogestión:</strong> capacidad para organizar
              eventos tácticos (cotizar comida masiva, gestionar espacios) de forma ordenada y
              rindiendo cuentas claras y con boletas a la Dirección de Finanzas.
            </li>
            <li>
              <strong>Liderazgo Integrador:</strong> facilidad natural para romper el hielo, motivar
              la participación y conectar a voluntarios de distintas áreas operativas que
              normalmente no interactúan entre sí.
            </li>
            <li>
              <strong>Resolución Preventiva de Conflictos:</strong> tacto y diplomacia para mediar
              en posibles roces internos o desgastes entre equipos antes de que escalen.
            </li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    id: 3,
    title: 'Coordinador(a) de Logística',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>
          <strong>Funciones Principales:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Gestión de la Cadena de Producción Impresa:</strong> ejecutar y supervisar el
              tiraje semanal de material pedagógico (guías, ensayos, controles, etc.). Es decir,
              coordinar el proceso completo de compaginado, corcheteado y empaquetado por curso,
              asegurando que cada sala reciba la cantidad exacta de material, disminuyendo el margen
              de error.
            </li>
            <li>
              <strong>Control de Inventario y Prevención de Quiebres de Stock:</strong> monitorear
              de forma continua los bienes fungibles (resmas, tóner, plumones, lápices, etc.). Ser
              responsable de anticiparse a los quiebres de stock y levantar las solicitudes de
              compra a Finanzas con el tiempo suficiente para no detener la operación.
            </li>
            <li>
              <strong>Gestión de Infraestructura:</strong> diseñar y mantener el sistema de
              almacenamiento físico dentro de la oficina. Esto implica crear un espacio de trabajo
              donde cualquier profesor pueda entrar y encontrar lo que necesita en menos de un
              minuto, evitando que la oficina se convierta en una bodega desordenada.
            </li>
            <li>
              <strong>Despliegue Operativo en Terreno:</strong> garantizar que las salas de clases
              estén operativas durante ensayos, es decir, liderar la logística pesada durante estos
              (distribución de facsímiles, recolección y orden de hojas de respuesta, etc.).
            </li>
          </ul>
        </li>
        <li>
          <strong>Perfil Requerido:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Rigor Metódico y Constancia:</strong> capacidad para ejecutar procesos
              repetitivos sin perder la atención al detalle. Un error logístico (como mezclar las
              guías de ciencias con las de historia) impacta directamente en la calidad de la clase.
            </li>
            <li>
              <strong>Visión Optimizadora:</strong> no conformarse con hacer las cosas como siempre
              se han hecho. Buscar constantemente formas de ahorrar papel, reciclar material
              sobrante, o reorganizar físicamente los estantes para que el trabajo manual sea más
              rápido.
            </li>
            <li>
              <strong>Estructuración Lógica:</strong> una mente naturalmente ordenada, capaz de
              categorizar elementos físicos y ayudar a Operaciones a definir cómo se registrará este
              inventario en las plataformas digitales del preuniversitario.
            </li>
            <li>
              <strong>Capacidad de Resolución Táctica:</strong> no entrar en pánico ante
              imprevistos, como un atasco en la impresora o un corte de luz. Saber reaccionar,
              buscar alternativas mecánicas o escalar el problema con rapidez.
            </li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    id: 4,
    title: 'Coordinador(a) Estudiantil',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>
          <strong>Funciones Principales:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Monitoreo de Retención y Alertas Tempranas:</strong> hacer seguimiento activo
              de la asistencia y el compromiso de los alumnos. Es el encargado de contactar a
              quienes empiezan a faltar a clases o ensayos para entender sus motivos (problemas
              personales, desmotivación, carga escolar) y buscar estrategias para evitar su
              deserción.
            </li>
            <li>
              <strong>Producción de Eventos y Experiencia del Alumno:</strong> planificar y ejecutar
              la logística de actividades extracurriculares enfocadas en los estudiantes. Esto
              incluye jornadas de bienvenida, dinámicas de distensión previo a ensayos (oncesitas) y
              ceremonias de cierre de año.
            </li>
            <li>
              <strong>Gestión de Orientación Vocacional:</strong> Coordinar la ejecución operativa
              de charlas de carreras, ferias vocacionales internas o talleres sobre cómo postular al
              FUAS y a la universidad. Trabaja la &quot;forma&quot; de estos eventos, mientras que
              los expositores invitados ponen el &quot;fondo&quot;.
            </li>
            <li>
              <strong>Recepción y Enlace Comunitario:</strong> liderar la inducción de los
              estudiantes al preuniversitario. Asegurarse de que entiendan las reglas de
              convivencia, sepan cómo usar las plataformas (la web o la aplicación) y tengan un
              canal de confianza para resolver dudas no académicas.
            </li>
          </ul>
        </li>
        <li>
          <strong>Perfil Requerido:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Empatía y Contención Emocional:</strong> alta inteligencia emocional para
              tratar con adolescentes que están bajo un nivel extremo de estrés y presión por la
              PAES. Perfil ideal para estudiantes de Psicología, Trabajo Social o Educación.
            </li>
            <li>
              <strong>Capacidad de Gestión y Seguimiento:</strong> orden metódico para revisar
              constantemente planillas o bases de datos de asistencia y rendimiento, cruzando esa
              información dura con la realidad personal de cada alumno.
            </li>
            <li>
              <strong>Conocimiento del Ecosistema de Admisión:</strong> manejo sólido (o disposición
              rápida a aprender) sobre los procesos burocráticos que estresan a los alumnos: fechas
              de inscripción a la PAES, llenado del FUAS, becas y gratuidad.
            </li>
            <li>
              <strong>Resolución Preventiva y Mediación:</strong> tacto para manejar problemas de
              disciplina o conflictos de convivencia entre alumnos dentro de las salas de clases,
              aplicando el reglamento del preuniversitario de forma justa y pedagógica.
            </li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    id: 5,
    title: 'Diseñador(a)',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>
          <strong>Funciones Principales:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Gobernanza Visual:</strong> velar por la integridad estética de la
              organización. Asegurar que las paletas de colores, tipografías y el uso del logo se
              mantengan coherentes en cualquier material impreso o digital.
            </li>
            <li>
              <strong>Producción Gráfica:</strong> tomar los textos pulidos entregados por la
              Coordinación de Comunicaciones y convertirlos en piezas visuales profesionales
              (publicaciones, afiches, dossiers para fondos concursables).
            </li>
            <li>
              <strong>Diseño de Interfaz:</strong> asesorar y ayudar a la Directiva de Operaciones
              con los recursos gráficos de la página web del preuniversitario para mejorar la
              experiencia de usuario.
            </li>
          </ul>
        </li>
        <li>
          <strong>Perfil Requerido:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Competencia Visual y Dominio Técnico:</strong> manejo ágil de software de
              diseño (Illustrator, Photoshop, Figma, entre otros; deseables pero no excluyentes) y
              herramientas de ensamble rápido (Canva).
            </li>
            <li>
              <strong>Sensibilidad Digital para Web:</strong> conocimiento sobre cómo exportar y
              entregar recursos digitales (archivos SVG, PNG, códigos HEX) de manera ordenada para
              facilitar el desarrollo frontend.
            </li>
            <li>
              <strong>Ejecución por Requerimientos:</strong> habilidad para tomar un texto y un
              objetivo de comunicación ya definidos y traducirlos rápidamente a un formato gráfico
              de alta calidad, operando como el brazo ejecutor visual.
            </li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    id: 6,
    title: 'Editor(a)',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>
          <strong>Funciones Principales:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Curaduría y Ensamble de Contenido:</strong> revisar los bancos de guías y
              ensayos acumulados de otras fuentes para seleccionar, extraer y combinar los mejores
              ejercicios y explicaciones. El objetivo es crear un documento nuevo y superior,
              adaptado al contexto del preuniversitario, en lugar de copiar material íntegro.
            </li>
            <li>
              <strong>Maquetación de Documentos:</strong> diseñar la estructura visual de las guías
              impresas. Esto implica asegurar que las ecuaciones se vean nítidas, que el texto sea
              legible y que se optimice el espacio en la hoja (para ayudar al equipo de Logística a
              no gastar papel de más).
            </li>
            <li>
              <strong>Traducción de Guías a Presentaciones:</strong> tomar el material escrito y
              transformarlo en presentaciones visuales (diapositivas) para que los profesores las
              usen como apoyo durante sus clases, asegurando que sigan una línea gráfica estipulada
              previamente.
            </li>
            <li>
              <strong>Control de Calidad Académica:</strong> actuar como filtro final de redacción y
              formato antes de que el material se envíe a imprimir, asegurando que la progresión de
              dificultad de los ejercicios tenga sentido y no haya errores de tipeo en las fórmulas
              o textos.
            </li>
          </ul>
        </li>
        <li>
          <strong>Perfil Requerido:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Criterio Pedagógico y de Síntesis:</strong> capacidad para identificar qué
              ejercicio es realmente útil para la PAES y cuál es relleno. Habilidad para resumir
              materia densa en esquemas o tablas fáciles de digerir.
            </li>
            <li>
              <strong>Dominio de Herramientas de Edición y Maquetación:</strong> manejo de
              procesadores de texto y herramientas de diseño de documentos. Es un gran plus si
              manejan software de tipografía y maquetación como Typst, o creación de gráficos
              vectoriales.
            </li>
            <li>
              <strong>Responsabilidad Intelectual:</strong> criterio para inspirarse en múltiples
              fuentes, modificar enunciados y cambiar valores numéricos para crear material propio,
              evitando el plagio directo.
            </li>
            <li>
              <strong>Autonomía de Ejecución:</strong> concentración individual para armar
              documentos precisos semana a semana.
            </li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    id: 7,
    title: 'Voluntario(a) de Logística',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>
          <strong>Funciones Principales:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Ejecución de Manufactura Pedagógica:</strong> operar el hardware de producción
              (impresoras de alto volumen) transformando los archivos digitales en el material
              físico que usarán los estudiantes. Ser responsable de la compaginación, el corcheteado
              y el empaque por lotes según las especificaciones de cada curso.
            </li>
            <li>
              <strong>Control de Calidad en Línea:</strong> actuar como el último filtro antes de
              que el material llegue al aula. Identificar fallas de impresión (páginas borrosas,
              cortes incompletos, guías mezcladas) y corregirlas en el momento para garantizar el
              estándar del preuniversitario.
            </li>
            <li>
              <strong>Mantenimiento del Espacio Operativo:</strong> apoyar a el(la) Coordinador(a)
              de Logística en el mantenimiento del orden de la oficina y alertar inmediatamente
              sobre cualquier falla técnica en las máquinas o bajas críticas en el inventario físico
              (ej. &quot;abrí la última caja de resmas&quot;).
            </li>
          </ul>
        </li>
        <li>
          <strong>Perfil Requerido:</strong>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Ejecución Metódica y Atención al Detalle:</strong> capacidad para realizar
              tareas físicas repetitivas manteniendo un alto nivel de concentración.
            </li>
            <li>
              <strong>Confiabilidad y Puntualidad:</strong> tener los materiales a tiempo para no
              retrasar la cadena educativa.
            </li>
            <li>
              <strong>Resolución Práctica:</strong> destreza y proactividad para destrabar problemas
              físicos inmediatos (por ejemplo, organizar cajas para optimizar el espacio).
            </li>
            <li>
              <strong>Trabajo en Equipo: </strong> disposición para seguir instrucciones
              estructuradas y coordinarse eficientemente bajo la guía de el(la) Coordinador(a) de
              Logística.
            </li>
          </ul>
        </li>
      </ul>
    ),
  },
]

export default roleDefinitions
