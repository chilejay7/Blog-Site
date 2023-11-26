const logoutBtn = document.getElementById('logoutBtn');

const sendLogout = async () => {
    const logoutResponse = await fetch ('/login/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

   logoutResponse.ok ? document.location.replace('/')
    : alert('Failed to logout');
}

logoutBtn.addEventListener('click', sendLogout);