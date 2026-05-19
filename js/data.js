const quizData = [
    {
        question: "Si estás escribiendo pseudocódigo y necesitas representar el valor numérico -150, ¿qué tipo de dato básico debes elegir?",
        hint: "Piensa en si el número contiene una parte fraccionaria o decimal, o si es un número entero cerrado.",
        options: [
            { text: "INTEGER (Entero)", isCorrect: true, rationale: "Este tipo de dato está diseñado específicamente para representar números enteros completos, tanto positivos como negativos, sin decimales." },
            { text: "REAL (Real)", isCorrect: false, rationale: "Aunque puede representar enteros si se escribe como -150.0, el tipo de dato más óptimo y exacto para un número sin decimales es el entero." },
            { text: "STRING (Cadena)", isCorrect: false, rationale: "Un número suelto sin comillas se procesa como un valor numérico directo, no como una cadena de texto." },
            { text: "BOOLEAN (Booleano)", isCorrect: false, rationale: "Los booleanos solo admiten valores lógicos de verdadero o falso, no valores numéricos numéricos escalares." }
        ]
    },
    {
        question: "¿Cuál de los siguientes valores representa adecuadamente un dato de tipo REAL en pseudocódigo?",
        hint: "Busca un valor que use notación de punto decimal directamente sin estar envuelto en comillas.",
        options: [
            { text: "15", isCorrect: false, rationale: "Este valor no posee parte decimal, por lo que es clasificado como un entero." },
            { text: "0.0", isCorrect: true, rationale: "Al incluir el punto decimal, le indica al sistema que contiene una parte fraccionaria, clasificándose como un número real." },
            { text: '"20.49"', isCorrect: false, rationale: "Aunque contiene un número con decimales, la presencia de las comillas dobles lo convierte automáticamente en una cadena de texto (STRING)." },
            { text: "'x'", isCorrect: false, rationale: "Este valor está delimitado por comillas simples y contiene un solo carácter alfabético, por lo que es de tipo CHAR." }
        ]
    },
    {
        question: "Si declaras la variable letra = 'g', ¿de qué tipo de dato básico se trata?",
        hint: "Fíjate en la cantidad de caracteres que se están almacenando dentro de las comillas.",
        options: [
            { text: "CHAR (Carácter)", isCorrect: true, rationale: "Representa un único símbolo, letra o número delimitado por comillas simples o dobles." },
            { text: "STRING (Cadena de texto)", isCorrect: false, rationale: "Aunque una cadena puede contener un solo carácter, el tipo más específico y elemental para un solo componente delimitado es el carácter." },
            { text: "BOOLEAN (Booleano)", isCorrect: false, rationale: "Este tipo de dato se limita únicamente a representar estados de verdadero o falso." },
            { text: "REAL (Real)", isCorrect: false, rationale: "Los tipos reales solo almacenan valores numéricos con coma flotante, no texto ni símbolos." }
        ]
    },
    {
        question: "¿Qué tipo de dato almacena únicamente los valores lógicos TRUE (Verdadero) y FALSE (Falso)?",
        hint: "Este tipo de dato lleva el nombre del matemático George Boole.",
        options: [
            { text: "BOOLEAN (Booleano)", isCorrect: true, rationale: "Es el tipo de dato lógico por excelencia, diseñado para representar operaciones de álgebra de Boole con solo dos estados posibles." },
            { text: "CHAR (Carácter)", isCorrect: false, rationale: "Un carácter puede almacenar letras como 'T' o 'F', pero no representa el valor lógico directo en sí mismo." },
            { text: "REAL (Real)", isCorrect: false, rationale: "Los números reales se usan para magnitudes cuantitativas con decimales, no para estados de veracidad lógico." },
            { text: "INTEGER (Entero)", isCorrect: false, rationale: "Aunque en sistemas antiguos se use 0 y 1, el tipo de dato específico y semántico para lógica en pseudocódigo moderno es el booleano." }
        ]
    },
    {
        question: "El valor \"Hola Mundo\" está delimitado por comillas dobles y contiene una secuencia de caracteres. ¿Qué tipo de dato es?",
        hint: "Se trata de un conjunto o 'cadena' de elementos alfanuméricos agrupados.",
        options: [
            { text: "STRING (Cadena de texto)", isCorrect: true, rationale: "Representa una secuencia de cero o más caracteres combinados (letras, espacios, símbolos) encerrados entre comillas." },
            { text: "CHAR (Carácter)", isCorrect: false, rationale: "Este tipo solo puede almacenar un único carácter, mientras que aquí tenemos una secuencia entera." },
            { text: "Text / Alphanumeric", isCorrect: false, rationale: "Aunque es un equivalente conceptual, este término se reserva específicamente para el modelado de bases de datos, no como tipo básico en pseudocódigo estándar." },
            { text: "BOOLEAN (Booleano)", isCorrect: false, rationale: "No representa una condición lógica de verdadero o falso, sino un texto libre." }
        ]
    },
    {
        question: "En el diseño de bases de datos, ¿cuál es el tipo de dato análogo o equivalente al STRING de la programación?",
        hint: "Busca el término que denota que se pueden combinar letras y números para formar un bloque de texto en una tabla de datos.",
        options: [
            { text: "Text / Alphanumeric (Texto / Alfanumérico)", isCorrect: true, rationale: "En base de datos, este tipo cumple la misma función que el STRING en programación, permitiendo guardar secuencias de letras y números tratadas como texto." },
            { text: "Date/time", isCorrect: false, rationale: "Este tipo se utiliza de forma exclusiva para marcas de tiempo y fechas, no para texto genérico." },
            { text: "CHAR (Carácter)", isCorrect: false, rationale: "El tipo CHAR en programación sigue representando un solo carácter, mientras que STRING es dinámico y equivalente al bloque de texto alfanumérico." },
            { text: "INTEGER (Entero)", isCorrect: false, rationale: "Los enteros en bases de datos siguen usándose para cálculos matemáticos exactos, no para texto." }
        ]
    },
    {
        question: "Si necesitas almacenar el valor \"123\" (con comillas), ¿por qué se considera de tipo STRING y no INTEGER?",
        hint: "Presta atención al papel que juegan los delimitadores visuales (comillas) al definir datos en pseudocódigo.",
        options: [
            { text: "Porque las comillas indican que es una secuencia de caracteres tratada como texto.", isCorrect: true, rationale: "Cualquier información envuelta en comillas pierde sus propiedades matemáticas directas y pasa a ser tratada como texto plano por el intérprete." },
            { text: "Porque contiene tres dígitos numéricos seguidos.", isCorrect: false, rationale: "Los dígitos numéricos pueden pertenecer tanto a enteros como a cadenas; la distinción radica en la sintaxis de delimitación." },
            { text: "Porque los números dentro de comillas se convierten automáticamente a reales.", isCorrect: false, rationale: "Las comillas no convierten el dato a real, de hecho impiden que se procese como cualquier tipo numérico directo sin una conversión explícita." },
            { text: "Porque es un dato lógico que depende de una condición.", isCorrect: false, rationale: "Los datos lógicos únicamente corresponden a verdadero o falso, y no se representan con secuencias de dígitos encerradas en comillas." }
        ]
    },
    {
        question: "En una base de datos, ¿bajo qué tipo de dato específico se guardaría de forma óptima el registro 15/05/2026 14:30?",
        hint: "Identifica cuál de las opciones se enfoca explícitamente en el registro cronológico (días, horas, minutos).",
        options: [
            { text: "Date/time (Fecha/hora)", isCorrect: true, rationale: "Es el tipo de dato nativo estructurado para almacenar de manera unificada instantes temporales concretos con día, mes, año y hora." },
            { text: "Text / Alphanumeric", isCorrect: false, rationale: "Aunque se podría guardar como texto, se perderían las funciones nativas de ordenación cronológica y operaciones temporales que ofrece el tipo específico." },
            { text: "REAL (Real)", isCorrect: false, rationale: "Los números reales almacenan magnitudes de punto decimal y no cuentan con estructura interna para interpretar formatos de calendario." },
            { text: "STRING (Cadena de texto)", isCorrect: false, rationale: "STRING es un concepto de lenguaje de programación general; las bases de datos utilizan tipos más especializados para optimizar las consultas de calendario." }
        ]
    },
    {
        question: "¿Cuál de las siguientes afirmaciones describe la diferencia fundamental entre un REAL y un INTEGER en pseudocódigo?",
        hint: "Piensa en qué tipo de números puedes representar con enteros y cuáles requieren precisión fraccionaria (como una división).",
        options: [
            { text: "El tipo REAL permite almacenar una parte fraccionaria o puntos decimales, mientras que el INTEGER no.", isCorrect: true, rationale: "Esta es la distinción matemática y de almacenamiento clave entre ambos tipos de datos numéricos en computación." },
            { text: "El tipo REAL solo puede almacenar números positivos.", isCorrect: false, rationale: "Ambos tipos de datos (tanto REAL como INTEGER) admiten perfectamente valores negativos y positivos." },
            { text: "El tipo INTEGER requiere el uso de comillas simples para ser definido.", isCorrect: false, rationale: "Los tipos numéricos nunca llevan comillas; si las llevaran, se transformarían en datos de tipo texto." },
            { text: "El tipo INTEGER se conoce en bases de datos como single o double.", isCorrect: false, rationale: "Los términos 'single' o 'double' hacen referencia a variaciones de precisión para números de tipo REAL." }
        ]
    },
    {
        question: "En el modelado de bases de datos, el código de inventario \"2JK8D\" se clasifica como Alfanumérico. ¿Por qué no es posible realizar operaciones aritméticas directas (como una suma) con este valor?",
        hint: "Considera qué sucede cuando mezclas letras con números bajo un formato destinado a la lectura textual.",
        options: [
            { text: "Porque es tratado puramente como texto por el sistema, inhabilitando las propiedades matemáticas de sus caracteres numéricos.", isCorrect: true, rationale: "Al ser alfanumérico, los caracteres numéricos dentro de la cadena no tienen valor cuantitativo; son solo grafemas de texto." },
            { text: "Porque contiene más de un número entero en su secuencia.", isCorrect: false, rationale: "El problema no es la cantidad de números, sino que la presencia de letras y el formato de texto impiden la interpretación aritmética." },
            { text: "Porque las bases de datos no permiten hacer sumas a menos que todos los campos sean de tipo Date/time.", isCorrect: false, rationale: "Las sumas se realizan sobre campos numéricos (como INTEGER o REAL), mientras que Date/time calcula intervalos temporales." },
            { text: "Porque requiere convertirse obligatoriamente a un tipo lógico booleano antes de procesarse.", isCorrect: false, rationale: "Los tipos lógicos solo devuelven verdadero/falso y no se utilizan para cálculos matemáticos con códigos de inventario." }
        ]
    }
];