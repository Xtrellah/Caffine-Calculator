document.getElementById('caffeine-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const time = document.getElementById('time').value;
    const drink = document.getElementById('drink').value;

    let caffeineContent;
    let caffeineInfo

    switch (drink) {
        case 'coffee':
            caffeineContent = 95;
            caffeineInfo = 'Coffee can contain between 90 and 100 milligrams of caffeine.'
            break;
        case 'black-tea':
            caffeineContent = 47;
            caffeineInfo = 'Black tea averages 47 milligrams of caffeine but can contain as much as 90 mg.'
            break;
        case 'green-tea':
            caffeineContent = 28;
            caffeineInfo = 'Green tea averages 30 to 50 milligrams of caffeine.'
            break;
        default:
            caffeineContent = 0;
    }

    document.getElementById('result').innerHTML =
        `<p>${caffeineInfo}</p>
        <p>You had a ${drink.replace('-', ' ')} at ${time}. Estimated caffeine: ${caffeineContent} mg.</p>
        <p>Below are the estimated levels of caffine (mg) in your sysetm for the next 12 hours:</p>
        <table>
            <tr>
                <th>Time</th>
                <td>${time}<br>(+0hrs)</td>
                <td>${addHoursToTime(time, 3)}<br>(+3hrs)</td>
                <td>${addHoursToTime(time, 6)}<br>(+6hrs)</td>
                <td>${addHoursToTime(time, 9)}<br>(+9hrs)</td>
                <td>${addHoursToTime(time, 12)}<br>(+12hrs)</td>
            </tr>
            <tr>
                <th>Caffeine in System</th>
                <td>${caffeineContent}mg</td>
                <td>${calculateHalfLife(caffeineContent, 3)}mg</td>
                <td>${calculateHalfLife(caffeineContent, 6)}mg</td>
                <td>${calculateHalfLife(caffeineContent, 9)}mg</td>
                <td>${calculateHalfLife(caffeineContent, 12)}mg</td>
            </tr>
        </table>`;
});

function addHoursToTime(timeStr, hoursToAdd) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    date.setHours(date.getHours() + hoursToAdd);

    const newHours = String(date.getHours()).padStart(2, '0');
    const newMinutes = String(date.getMinutes()).padStart(2, '0');
    return `${newHours}:${newMinutes}`;
}

function calculateHalfLife(initialAmount, hoursPassed, halfLife = 6) {
    const remaining = initialAmount * Math.pow(0.5, hoursPassed / halfLife);
    return remaining.toFixed(2);
}
