import React from "react";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: "",
            error: false,
            loading: false,
        };
    };
    componentDidUpdate(){
        console.log('Actialización');
        if (!!this.state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación");
                // this.setState({loading:false});
                if (SECURITY_CODE === this.state.value) {
                    this.setState({loading: false, error: false});
        
                } else {
                    this.setState({loading: false, error: true});
                }
                console.log("Terminando la validación");
            }, 3000);
        }
    }
   render(){

    //const { value, error, loading } = this.state; //manera de remplazar lo largo

    return(
        <div>
            <h2>Eliminar con {this.props.name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {(this.state.error && !this.state.loading) && (
                <p>Error: el código es incorrecto</p>
            )}
            {this.state.loading && (
                <p>Loading...</p>
            )}
            <input 
                placeholder="Código de Seguridad" 
                value={this.state.value}
                onChange={(event) => {
                    this.setState({value: event.target.value });
                }}
            />
            <button
                onClick={() => 
                    this.setState({loading: true})
                }
            >Comprobar</button>
        </div>
    );
   }
};

export { ClassState };

//una forma
// onClick={() => 
//     this.setState({ error: !this.state.error })}

//this.setState(prevState => ( {error: !prevState.error }))