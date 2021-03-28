

/**
 * 2C= Dos trebol
 * 2D= Dos Diaminds
 * 2H= Dos trebol
 * 2S= Dos trebol
 *
 *
 * */

let deck = [];
const tipos = [ 'C', 'H', 'S', 'D' ];
const especiales = [ 'A', 'J', 'Q', 'K' ];

let puntosJugador = 0,
    puntosComputadora = 0;


// referencias html
const btnPedir = document.querySelector( '#btnPedir' );
const btnDetener = document.querySelector( '#btnDetener' );
const btnNuevo = document.querySelector( '#btnNuevo' );

const divCartasJugador = document.querySelector( '#jugador-cartas' );
const divCartasComputadora = document.querySelector( '#computadora-cartas' );
const puntosHTML = document.querySelectorAll( 'small' );


// ESTA FUNCION CREA UNA NUEVA BARAJA   
const crearDeck = () => {

    for ( let i = 2; i <= 10; i++ ) {
        for ( const tipo of tipos ) {
            deck.push( i + tipo );
        }
    }

    for ( const tipo of tipos ) {
        for ( const especial of especiales ) {
            deck.push( especial + tipo );
        }
    }

    // console.log( deck );
    deck = _.shuffle( deck ); // se pone los elementos en forma aleatoria
    console.log( deck );

    return deck;
};


crearDeck();

// ESTA FUNCION ME PERMITE TOMAR UNA CARTA
const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
        // return;
    }

    const carta = deck.pop();

    // console.log( deck );
    // console.log( carta ); // carta debe de ser de la baraja

    return carta;
};

// deck = [];
pedirCarta();

// funcion que retorna cuanto vale cada carta seleccionada
const valorCarta = ( carta ) => {

    const valor = carta.substring( 0, carta.length - 1 ); // extraemos los dos valores iniciales

    return ( isNaN( valor ) ) ?
        ( valor === 'A' ) ? 11 : 10
        : valor * 1;

};


// const valor = valorCarta( pedirCarta() );

// turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    // se usa do while porque se debe ejecutar por lo menos 1 vez
    do {
        const carta = pedirCarta();

        puntosComputadora += valorCarta( carta );

        // console.log( { carta, puntosComputadora } );
        // actualizamos el puntaje en el DOM en la etiqueta small
        puntosHTML[ 1 ].innerText = puntosComputadora;

        // agregamos la carta con sus clases
        // <img class="carta" src="assets/cartas/10C.png" alt="">
        const imgCarta = document.createElement( 'img' );
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );
        divCartasComputadora.append( imgCarta );


        // condicion si el jugador tiene puntaje superior a 21
        if ( puntosMinimos > 21 ) {
            break;
        }


    } while ( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) );

    setTimeout( () => {

        if ( puntosComputadora === puntosMinimos ) {
            alert( 'Nadie gana :(' );
        } else if ( puntosMinimos > 21 ) {
            alert( 'computadora gana' );
        } else if ( puntosComputadora > 21 ) {
            alert( 'Jugador gana' );
        } else if ( puntosComputadora > puntosMinimos ) {
            alert( 'computadora gana' );
        }

    }, 10 );

};




// eventos
btnPedir.addEventListener( 'click', () => {

    const carta = pedirCarta();

    puntosJugador += valorCarta( carta );

    // console.log( { carta, puntosJugador } );
    // actualizamos el puntaje en el DOM en la etiqueta small
    puntosHTML[ 0 ].innerText = puntosJugador;

    // agregamos la carta con sus clases
    // <img class="carta" src="assets/cartas/10C.png" alt="">
    const imgCarta = document.createElement( 'img' );
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add( 'carta' );
    divCartasJugador.append( imgCarta );


    // validacion de puntaje
    if ( puntosJugador > 21 ) {
        console.warn( 'Lo siento mucho perdiste' );
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );


    } else if ( puntosJugador === 21 ) {
        console.warn( '21 genial' );
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

} );



// funcion para btn detener
btnDetener.addEventListener( 'click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );
} );


// funcion de nuevo juego
btnNuevo.addEventListener( 'click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosComputadora = 0;
    puntosJugador = 0;

    puntosHTML[ 0 ].innerText = 0;
    puntosHTML[ 1 ].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

} );