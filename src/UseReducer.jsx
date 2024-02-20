import React, { useReducer } from "react";

const SECURITY_CODE = 'paradigma';
function UseReducer({name}) {
    const [state, dispatch] =React.useReducer(reducer, initialState);

    //  const onWrite = (newValue) => {
    //     setState({
    //         ...state,
    //         value: newValue,
    //     });
    // };

    React.useEffect(() => {

        if(!!state.loading){
            setTimeout(() => {

                if (state.value === SECURITY_CODE) {
                    dispatch({type: 'CONFIRM'});

                } else {
                    dispatch({type: 'ERROR'});

                }

            }, 3000);
        }

    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return(
            <div>
                <h2>Eliminar con {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}
                <input 
                    placeholder="Código de Seguridad"
                    value={state.value}
                    onChange={(event) =>{
                        dispatch({type: 'WRITE', payload: event.target.value});
                        // onWrite(event.target.value);
                    }} 
                />
                <button
                    onClick={() => {
                        dispatch({type: 'CHECK'});
                    }}
                >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return(
            <>
                <p>Necesitamos confirmar ¿Estás seguro?</p>
                <button
                onClick={() => {
                    dispatch({type: 'DELETE'});
                }}
                >
                    Sí, Eliminar
                </button>
                <button
                onClick={() => {
                    dispatch({type: 'RESET'});
                }}
                >
                    No, Devolver</button>
            </>
        );
    }else{
        return(
            <>
                <p>Eliminado con éxito</p>
                <button
                onClick={() => {
                    dispatch({type: 'RESET'});
                }}
                >
                    Resetear, volver atrás
                </button>
            </>

        );
    }
};



const initialState = {
    value:"",
    error:false,
    loading:false,
    deleted:false,
    confirmed:false,
};

// const reducerIf = (state, action) => {
//     if (action.type === 'ERROR') {
//         return {
//             ...state,
//             error: true,
//             loading: false,
//         }
//     } else if (action.type === 'CONFIRM') {
//         return {
//             ...state,
//             error: false,
//             loading: false,
//             confirmed: true,
//         }
//     } else {
//         return {
//             ...state,
//         }
//     }
// };

// const reducerSWITCH = (state, action) => {
//     switch (action.type) {
//         case 'ERROR':
//             return {
//                 ...state,
//                 error: true,
//                 loading: false,
//             };
//         case 'CONFIRM':
//             return {
//                 ...state,
//                 error: false,
//                 loading: false,
//                 confirmed: true,
//             };
//  default:
//             return {
//                 ...state,
//             };
//     }
//  }

 const reducerOBJECT = (state, payload) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CONFIRM': {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    'WRITE': {
        ...state,
        value: payload,
    },
    'CHECK': {
        ...state,
        loading: true,
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'RESET': {
        ...state,
        confirmed: false,
        deleted: false,
        value: "",
    },
 })
 
 const reducer = (state, action) => {
    if (reducerOBJECT(state)[action.type]) {
        return reducerOBJECT(state, action.payload)[action.type];
    } else {
        return {
            ...state,
        }
    }
 }

 export { UseReducer };