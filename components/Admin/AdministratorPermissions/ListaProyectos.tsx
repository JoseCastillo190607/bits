
const ListaProyectos =({Proyectos}:any)=>{

  const List =(
    <ul className='listaProyectos_container'>
        {Proyectos.map((Proyecto:any)=>
            <li key={Proyecto} className='lista_Proyectos'>
                {Proyecto}
            </li>
        )}
    </ul>
)
return(
    <div>
        {List}
    </div>
)
}

export default ListaProyectos
