// ====== DERIVATION STEPS (WITH REAL EQUATIONS) ======
const stepsData = [
`<b>Step 1: Basic Resource Usage Equation</b><br>
\\[
x_r = \\theta_r \\tau + \\mu_r \\mu
\\]`,

`<b>Step 2: Take Differential Form</b><br>
\\[
\\Delta x_r = \\theta_r \\Delta \\tau + \\mu_r \\Delta \\mu
\\]`,

`<b>Step 3: Convert to Rate Form</b><br>
\\[
\\frac{dx_r}{d\\tau} = \\theta_r + \\mu_r \\frac{d\\mu}{d\\tau}
\\]`,

`<b>Step 4: Use Failure Intensity Relation</b><br>
\\[
\\frac{d\\mu}{d\\tau} = \\lambda
\\]`,

`<b>Step 5: Substitute in Equation</b><br>
\\[
\\frac{dx_r}{d\\tau} = \\theta_r + \\mu_r \\lambda
\\]`,

`<b>Step 6: Resource Consumption in Calendar Time</b><br>
\\[
\\frac{dx_r}{dt} = P_r \\rho_r
\\]`,

`<b>Step 7: Relate Execution Time and Calendar Time</b><br>
\\[
\\frac{dx_r}{d\\tau} = \\frac{dx_r}{dt} \\cdot \\frac{dt}{d\\tau}
\\]`,

`<b>Step 8: Substitute Resource Rate</b><br>
\\[
\\frac{dx_r}{d\\tau} = (P_r \\rho_r) \\cdot \\frac{dt}{d\\tau}
\\]`,

`<b>Step 9: Rearranging</b><br>
\\[
\\frac{dt}{d\\tau} = \\frac{1}{P_r \\rho_r} \\cdot \\frac{dx_r}{d\\tau}
\\]`,

`<b>Step 10: Final Substitution</b><br>
\\[
\\frac{dt}{d\\tau} = \\frac{\\theta_r + \\mu_r \\lambda}{P_r \\rho_r}
\\]`,

`<b>Final Result:</b><br>
\\[
\\boxed{
\\frac{dt}{d\\tau} = \\frac{\\theta_r + \\mu_r \\lambda}{P_r \\rho_r}
}
\\]`
];

// ====== SETTINGS ======
const typingSpeed = 45;     // slower typing
const stepDelay = 2500;     // delay after each step finishes

const container = document.getElementById("steps");

// ====== TYPEWRITER FUNCTION ======
function typeHTML(element, html, index = 0) {

    return new Promise((resolve) => {
        // Create a temporary div to strip HTML tags
        const temp = document.createElement("div");
        temp.innerHTML = html;
        const text = temp.innerText; // only text content

        function typeChar(i) {
            if (i < text.length) {
                element.innerText += text.charAt(i);
                setTimeout(() => typeChar(i + 1), typingSpeed);
            } else {
                // After typing, replace with real HTML
                element.innerHTML = html;

                element.classList.remove("typing");

                // Render Math
                if (window.MathJax) {
                    MathJax.typesetPromise([element]);
                }

                resolve();
            }
        }

        typeChar(0);
    });
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ====== SHOW STEPS ONE BY ONE ======
async function showSteps() {
    for (const step of stepsData) {
        const stepDiv = document.createElement("div");
        stepDiv.classList.add("step", "typing");

        container.appendChild(stepDiv);

        // Animate appearance
        setTimeout(() => {
            stepDiv.classList.add("show");
        }, 100);

        // Start typing and wait until finished
        await typeHTML(stepDiv, step);

        // Delay before the next step starts
        await wait(stepDelay);
    }
}

// ====== START ======
showSteps();