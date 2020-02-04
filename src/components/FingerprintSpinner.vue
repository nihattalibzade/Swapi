<template>
    <div class="d-flex flex-column align-items-center">
        <fingerprint-spinner
                :animation-duration="3000"
                :size="150"
                color="#ff1d5e"
        />
        <h4 class="mt-5">Data is being fetched...</h4>
    </div>
</template>

<script>
    import { FingerprintSpinner } from 'epic-spinners';
    export default {
        components: {
            FingerprintSpinner
        }
    }
</script>

<style scoped>

</style>
