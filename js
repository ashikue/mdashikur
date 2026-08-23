const trainForm = document.getElementById("trainForm");
const passengerForm = document.getElementById("passengerForm");
const trainList = document.getElementById("trainList");
const bookingSection = document.getElementById("booking");
const message = document.getElementById("message");

const trains = [
    {
        name: "Subarna Express",
        time: "07:00 AM - 12:00 PM",
        type: "AC",
        price: 850
    },
    {
        name: "Sonar Bangla Express",
        time: "08:30 AM - 01:30 PM",
        type: "AC",
        price: 750
    },
    {
        name: "Mohanagar Express",
        time: "03:00 PM - 09:00 PM",
        type: "Non-AC",
        price: 500
    },
    {
        name: "Turna Express",
        time: "11:30 PM - 05:30 AM",
        type: "AC",
        price: 900
    }
];

let selectedTrain = null;

trainForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const passengers = document.getElementById("passengers").value;

    if (from === to) {
        showMessage("From and To stations cannot be the same.", "error");
        return;
    }

    trainList.innerHTML = "";

    trains.forEach((train, index) => {
        const totalPrice = train.price * passengers;

        const card = document.createElement("div");
        card.className = "train-card";

        card.innerHTML = `
            <div class="train-info">
                <h3>${train.name}</h3>
                <p><strong>Route:</strong> ${from} → ${to}</p>
                <p><strong>Time:</strong> ${train.time}</p>
                <p><strong>Class:</strong> ${train.type}</p>
                <p><strong>Date:</strong> ${date}</p>
            </div>

            <div>
                <div class="price">৳${totalPrice}</div>
                <button onclick="selectTrain(${index}, '${from}', '${to}', '${date}', ${passengers})">
                    Book Now
                </button>
            </div>
        `;

        trainList.appendChild(card);
    });

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
});

function selectTrain(index, from, to, date, passengers) {
    selectedTrain = {
        train: trains[index],
        from: from,
        to: to,
        date: date,
        passengers: passengers
    };

    bookingSection.classList.remove("hidden");

    bookingSection.scrollIntoView({
        behavior: "smooth"
    });

    showMessage("Please enter passenger information.", "success");
}

passengerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!selectedTrain) {
        showMessage("Please select a train first.", "error");
        return;
    }

    const bookingID = "TRN" + Math.floor(100000 + Math.random() * 900000);

    showMessage(
        `Booking Successful!<br><br>
        <strong>Booking ID:</strong> ${bookingID}<br>
        <strong>Passenger:</strong> ${name}<br>
        <strong>Train:</strong> ${selectedTrain.train.name}<br>
        <strong>Route:</strong> ${selectedTrain.from} → ${selectedTrain.to}<br>
        <strong>Date:</strong> ${selectedTrain.date}<br>
        <strong>Passengers:</strong> ${selectedTrain.passengers}`,
        "success"
    );

    passengerForm.reset();
    bookingSection.classList.add("hidden");
});

function showMessage(text, type) {
    message.innerHTML = text;
    message.className = type;

    setTimeout(() => {
        message.innerHTML = "";
        message.className = "";
    }, 8000);
}
