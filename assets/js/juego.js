

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
    deck = _.shuffle( deck );
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


const valor = valorCarta( pedirCarta() );


// eventos
btnPedir.addEventListener( 'click', () => {

    const carta = pedirCarta();

    puntosJugador += valorCarta( carta );

    // console.log( { carta, puntosJugador } );
    // actualizamos el puntaje en el DOM en la etiqueta small
    puntosHTML[ 0 ].innerText = puntosJugador;
    

} );


