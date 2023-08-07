const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowAsesoria3 = addKeyword(['a','e','i','o','u'])
    .addAnswer(['En breve un asesor se comunicará con usted para asesorarle'])
const flowQueja3 = addKeyword(['a','e','i','o','u'])
    .addAnswer(['En breve un asesor se comunicará con usted para resolver su conflicto'])
const flowAsesoria2 = addKeyword(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
    .addAnswer(['¿En qué podemos asesorarle?'],
    null,
    null,
    [flowAsesoria3]
    )
const flowQueja2  = addKeyword(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
    .addAnswer(
        [
            'Por favor comentenos el motivo de su queja'
        ],
        null,
        null,
        [flowQueja3]
)

const flowLlamada = addKeyword(['1','llamada'])
    .addAnswer(['En breve un asesor se comunicará con usted'])

const flowMensaje = addKeyword(['2','mensaje'])
.addAnswer(['Ingrese los equipos que desee que le coticemos'])

const flowCoti2 = addKeyword(['1', '2', '3', '4'])
    .addAnswer(
        [
            'Escriba el número de su elección:',
            '1️⃣ ¿Desea que nos comuniquemos con usted vía telefónica?',
            '2️⃣ ¿Desea que le enviemos los precios por este medio?',
        ],
    null,
    null,
    [flowLlamada, flowMensaje]
)
const flowCoti = addKeyword(['1', 'cotización', 'cotizacion'])
    .addAnswer('¿Qué sucursal le queda más cerca?')
    .addAnswer(
        [
            'Escriba el número de su elección:',
            '1️⃣ Cuernavaca, Mor.',
            '2️⃣ Chilpancingo, Gro.',
            '3️⃣ Pachuca, Hgo.',
            '4️⃣ Tulancingo, Hgo.',
        ],
    null,
    null,
    [flowCoti2]
)

const flowAsesoria = addKeyword(['2', 'asesoría', 'asesoria']).addAnswer(
    [
        'Por favor proporcione los siguientes datos:',
        '▫ Número de factura',
        '▫ Equipo',
    ],
    null,
    null,
    [flowAsesoria2]
)

const flowQueja = addKeyword(['3', 'queja', 'sugerencia']).addAnswer(
    [
        'Por favor proporcione el número de factura',
    ],
    null,
    null,
    [flowQueja2]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas', 'buenos'])
    .addAnswer('Gracias por comunicarte a RefCom Cv, en qué podemos ayudarte?')
    .addAnswer(
        [
            'Escriba el número de su elección:',
            '1️⃣ Cotización de equipos/refacciones',
            '2️⃣ Soy cliente y requiero asesoría',
            '3️⃣ Quejas y/o sugerencias',
        ],
        null,
        null,
        [flowCoti, flowAsesoria, flowQueja]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
