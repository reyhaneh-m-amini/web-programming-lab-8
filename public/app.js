const result = document.getElementById("result");
const buttons = document.querySelectorAll("button[data-path]");

buttons.forEach((button) => {
    button.addEventListener("click", async () => {
        const path = button.dataset.path;
        let method = "GET";

        if (path === "/api/subscribe") {
            method = "POST";
        }

        try {
            const response = await fetch(path, {
                method: method
            });

            const body = await response.text();

            try {
                const data = JSON.parse(body);
                result.textContent = `Status: ${response.status}\n\n${JSON.stringify(data, null, 2)}`;
            } catch {
                result.textContent = `Status: ${response.status}\n\n${body}`;
            }
        } catch (error) {
            result.textContent = `Request failed: ${error.message}`;
        }
    });
});