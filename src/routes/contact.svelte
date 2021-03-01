<script>
    import Input, { inputTypes } from "../components/Input.svelte";

    let inputInfo = {
        name: {
            value: null,
            isValid: null,
            validateFn: null,
        },
        email: {
            value: null,
            isValid: null,
            validateFn: null,
        },
        subject: {
            value: null,
            isValid: null,
            validateFn: null,
        },
        message: {
            value: null,
            isValid: null,
            validateFn: null,
        },
    };

    let status = {
        message: "",
        isError: null,
    }

    $: emailText = `Senders email: ${inputInfo.email.value}\n\n${inputInfo.message.value}`

    const handleSubmit = async () => {
        const allInputsAreValid = validateInputs();

        if (!allInputsAreValid) {
            status.message = "Message not sent. Please ensure all the input fields are valid.";
            status.isError = true;
            return;
        }

        status.message = "Sending the message...";
        status.isError = false;
        const response = await fetch("https://portfolio-email-service-fau3eq2qoq-ew.a.run.app", {
            method: "POST",
            body: JSON.stringify({
                from: "Portfolio Email Service <portoflio.contact.service@gmail.com>",
                to: "Matthew Kennedy <kennedymj97@gmail.com>",
                subject: inputInfo.subject.value,
                text: emailText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            status.message = "Message sent successfully!";
            status.isError = false;
        } else {
            status.message = "Whoops, something went wrong on our end. Please try again later.";
            status.isError = true;
        }
    };

    const validateInputs = () => {
        let allInputsAreValid = true;
        for (const inputKey in inputInfo) {
            inputInfo[inputKey].validateFn();
            if (!inputInfo[inputKey].isValid) {
                allInputsAreValid = false;
            }
        }
        return allInputsAreValid;
    };


</script>

<svelte:head>
    <title>Matthew Kennedy | Contact</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col max-w-lg mx-auto">
    <h1 class="mb-10">Contact Me</h1>
    <Input bind:value={inputInfo.name.value} bind:isValid={inputInfo.name.isValid} type={inputTypes.NAME} bind:validateInput={inputInfo.name.validateFn} />
    <Input bind:value={inputInfo.email.value} bind:isValid={inputInfo.email.isValid} type={inputTypes.EMAIL} bind:validateInput={inputInfo.email.validateFn} />
    <Input bind:value={inputInfo.subject.value} bind:isValid={inputInfo.subject.isValid} type={inputTypes.SUBJECT} bind:validateInput={inputInfo.subject.validateFn} />
    <Input bind:value={inputInfo.message.value} bind:isValid={inputInfo.message.isValid} type={inputTypes.MESSAGE} bind:validateInput={inputInfo.message.validateFn} />
    <input type="submit" value="Send" class="self-center w-1/2 px-4 py-2 mt-4 text-white bg-indigo-600 rounded outline-none cursor-pointer focus:ring-2 ring-indigo-300 hover-hover:hover:bg-indigo-500" />
    {#if status.message !== "" && status.message !== null}
        <span class="self-center mt-4 {status.isError === true ? 'text-red-600' : ''}">{status.message}</span>
    {/if}
</form>
