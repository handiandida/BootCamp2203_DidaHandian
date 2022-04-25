function navbar(props) {
    console.log(props.navHeading)
    return(
    <div>
        <h1>{props.navHeading}</h1>
        <ul>
            <li>
                {props.nav}
            </li>
        </ul>
    </div>
    )
}

export default navbar;