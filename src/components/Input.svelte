<script context="module">
    export const inputTypes = {
        NAME: "Name",
        EMAIL: "Email",
        SUBJECT: "Subject",
        MESSAGE: "Message"
    };
</script>

<script>
    export let value = "";
    export let isValid = null;
    export let type = null;
    
    function validateEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return value !== null && value !== "" && re.test(value.toLowerCase());
    }

    export const validateInput = () => {
        switch(type) {
            case inputTypes.NAME:
            case inputTypes.SUBJECT:
            case inputTypes.MESSAGE:
                isValid = value !== "" && value !== null;
                break;
            case inputTypes.EMAIL:
                isValid = validateEmail();
                break;
            default:
                isValid = false;
        }
    }
</script>

<label for={type}>{type}</label>
{#if type === inputTypes.MESSAGE}
<textarea bind:value={value} on:blur="{() => validateInput()}" class="h-40 px-4 py-2 my-2 border border-gray-300 rounded outline-none focus:ring-2 {isValid !== false ? 'ring-indigo-300' : 'ring-red-300 ring-2'}" id={type} autocomplete="off"/>
{:else}
<input bind:value={value} on:blur="{() => validateInput()}" class="px-4 py-2 my-2 border border-gray-300 rounded outline-none focus:ring-2 {isValid !== false ? 'ring-indigo-300' : 'ring-red-300 ring-2'}" id={type} autocomplete="off"/>
{/if}
