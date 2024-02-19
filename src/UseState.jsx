import React, { useState } from "react";

const SECURITY_CODE = 'paradigma';
function UseState({name}) {

    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        console.log("Empezamos el efecto");
        if(!!loading){
            setTimeout(() => {
                console.log("Haciendo la validación");
                if (value === SECURITY_CODE) {
                    setLoading(false);
                    setError(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
                // setLoading(false);
                console.log("Terminando la validación");
            }, 3000);
        }
        console.log("Terminamos el efecto");
    }, [loading]);

    return(
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {error && (
                <p>Error: el código es incorrecto</p>
            )}
            {loading && (
                <p>Cargando...</p>
            )}
            <input 
                placeholder="Código de Seguridad"
                value={value}
                onChange={(event) =>{
                    setValue(event.target.value);
                }} 
            />
            <button
                onClick={() => (
                    setError(false),
                    setLoading(!loading)
                    )}
            >Comprobar</button>
        </div>
    );
};

export { UseState };