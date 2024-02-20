import React, { useReducer } from "react";

const SECURITY_CODE = 'paradigma';
function UseReducer({name}) {
    const [state, dispatch] =React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type:actionTypes.confirm });
    const onError = () => dispatch({ type:actionTypes.error });
    const onCheck = () => dispatch({ type:actionTypes.check });
    const onDelete = () => dispatch({ type:actionTypes.delete });
    const onReset = () => dispatch({ type:actionTypes.reset });
    const onWrite = ({target : {value}}) => {
        dispatch({ type:actionTypes.write, payload: value });
    };
    
    React.useEffect(() => {

        if(!!state.loading){
            setTimeout(() => {

                if (state.value === SECURITY_CODE) {
                    onConfirm();

                } else {
                    onError();

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
                    onChange={onWrite} 
                />
                <button onClick={onCheck}>Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return(
            <>
                <p>Necesitamos confirmar ¿Estás seguro?</p>
                <button onClick={onDelete}>
                    Sí, Eliminar
                </button>
                <button onClick={onReset}>
                    No, Devolver</button>
            </>
        );
    }else{
        return(
            <>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>
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

const actionTypes = {
    error: 'ERROR',
    confirm: 'CONFIRM',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
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
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
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