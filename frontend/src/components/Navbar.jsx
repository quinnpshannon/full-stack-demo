
export default function Navbar({user}){
    if(user.username)
    return(
        <nav>
        <a href="http://google.com">Google</a>
        <a href={"login"}>Log Out</a>
        </nav>
    )
    else
    return(
        <nav>
        <a href="http://google.com">Google</a>
        <a href={"login"}>Log in</a>
        </nav>
    )
}