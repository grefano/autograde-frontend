
const fetchAuth = async (endpoint: string) => {
    fetch(import.meta.env.VITE_SERVER_URL+endpoint)
}

module.exports = {
    fetchAuth
}