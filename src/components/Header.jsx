import '../index.css'

export default function Header() {
    return <header>
        <h1>Kanye Memory Card Game</h1>
        <nav>
            <button onClick={() => {window.open(`https://github.com/jdogcodey`, '_blank')}}><img id='github-logo' src='/github.svg'/></button>
        </nav>
    </header>
}