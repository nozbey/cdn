localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches ? (document.documentElement.classList.add("dark"), document.getElementById("switchDarkMode").checked = !0) : (document.documentElement.classList.remove("dark"), document.getElementById("switchDarkMode").checked = !1);
document.getElementById("switchDarkMode").addEventListener("click", function () {
    document.getElementById("switchDarkMode").checked ? (document.documentElement.classList.add("dark"), localStorage.theme = "dark") : (document.documentElement.classList.remove("dark"), localStorage.theme = "light")
});

fetch('./wudaqid')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        // Inject the fetched text into the HTML element with id 'doraid'
        document.getElementById('doraid').textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

fetch('./firmware')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        // Inject the fetched text into the HTML element with id 'firmware'
        document.getElementById('firmware').textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

// when reset button is clicked, swal confirmation will appear and if confirmed, it will call /reset with get then dont need response just sweetalert
document.getElementById('reset').addEventListener('click', function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You will reset the SSID and Password to empty!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('/reset').then(
                Swal.fire(
                    'Reset!',
                    'SSID and Password has been reset for AP mode.',
                    'success'
                )
            );
        }
    });
});


// submit button click event /setconfig with get request parameters ssid, password, and firmware
document.getElementById('submit').addEventListener('click', function () {
    var ssid = document.getElementById('ssid').value;
    var password = document.getElementById('password').value;
    // confirm the ssid and password with sweetalert
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        html: '<pre>SSID: <bold>' + ssid + '</bold>\nPassword: <bold>' + password + '</bold></pre>',
        customClass: {
            popup: 'format-pre'
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, set it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/setconfig?ssid=${ssid}&password=${password}&firmware=${document.getElementById('firmware').textContent}`)
                .then(
                    Swal.fire({
                        title: 'Success!',
                        text: 'SSID and Password has been set. Please connect to same network to access the device.',
                        icon: 'success'
                    })).catch(error => {
                        console.error('Error:', error);
                    });
        }
    });
});