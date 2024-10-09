export default function Header() {
    return <header>
        <h1>Kanye Memory Card Game</h1>
        <nav>
            <button id='github-logo' onClick={() => {window.open(`https://github.com/jdogcodey`, '_blank')}}><img src='../public/github.svg'/></button>
        </nav>
    </header>
}