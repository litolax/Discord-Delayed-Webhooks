import axios from "axios";

export default function sendWebhook(props: any) {
    let embeds = [
        {
            title: "Discord Webhook Example",
            color: 5174599,
            footer: {
                text: props.text,
            },
            fields: [
                {
                    name: "Field Name",
                    value: "Field Value"
                },
            ],
        },
    ];

    let data = JSON.stringify({ embeds }); 

    const url = "https://discord.com/api/webhooks/1052471248170516510/7LQD8KPhIPlsEqgSU-Hf67LkMS_eF72q2Q3PB4d9Z0COVmS0QQ6lpQLeBmNac1bFK8A_";
    var config = {
        method: "POST",
        url: url, // https://discord.com/webhook/url/here
        headers: { "Content-Type": "application/json" },
        data: data,
    };

    axios(config)
        .then((response) => {
            console.log("Webhook delivered successfully");
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}
