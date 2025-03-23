const elem = document.querySelector('pre');

const display = (data) => {
    elem.innerHTML = data.join('<br><br>');
}