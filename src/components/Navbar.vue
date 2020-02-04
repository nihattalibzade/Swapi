<template>
    <div>
        <b-navbar toggleable="md" type="white" variant="white">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="#">
                <b-img src="https://thehub-io.imgix.net/files/s3/20191210101756-06e01149b4f82f73bdc94a5e0171aa33.jpeg?fit=crop&w=300&h=300&q=60" rounded="circle" alt="Vue nav logo" width="50" height="50" />
            </b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item>NewBanking</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template slot="button-content">
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>

</style>
