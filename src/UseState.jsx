import React, { useState } from "react";

const SECURITY_CODE = 'paradigma';
function UseState({name}) {
    const [state, setState] =React.useState({
        value:"",
        error:false,
        loading:false,
       });
    // const [value, setValue] = useState('');
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        console.log("Empezamos el efecto");
        if(!!state.loading){
            setTimeout(() => {
                console.log("Haciendo la validación");
                if (state.value === SECURITY_CODE) {
                    setState({
                        ...state,
                        loading:false,
                        error:false,
                    });
                    // setLoading(false);
                    // setError(false);
                } else {
                    setState({
                        ...state,
                        loading:false,
                        error:true,
                    });
                    // setError(true);
                    // setLoading(false);
                }
                // setLoading(false);
                console.log("Terminando la validación");
            }, 3000);
        }
        console.log("Terminamos el efecto");
    }, [state.loading]);

    return(
        <div>
            <h2>Eliminar {name}</h2>
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
                    // setValue(event.target.value);
                    setState({
                        ...state,
                        value:event.target.value
                    });
                }} 
            />
            <button
                onClick={() => {
                    // setError(false)
                    // setLoading(!loading)
                    setState({
                        ...state,
                        loading:true,
                    });
                }}
            >Comprobar</button>
        </div>
    );
};

export { UseState };