<template>
    <!--부트스트랩에서 가져온 pagination-->
    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li v-if="currentPage !==1" class="page-item">
            <a 
                style="cursor: pointer" 
                class="page-link" 
                @click="onclick(currentPage - 1)"
            >
                Previous
            </a>
        </li>
        <li 
            v-for="page in numberOfPages"
            :key ="page"
            class="page-item"
            :class = "currentPage === page ? 'active' : ''"
        >
            <a 
                style="cursor: pointer" 
                class="page-link" 
                @click="onclick(page)"
            >
                {{page}}
            </a>
        </li> 
        <li v-if="numberOfPages !== currentPage" class="page-item">
            <a 
                style="cursor: pointer" 
                class="page-link"
                @click="onclick(currentPage + 1)"
            >
                Next
            </a>
        </li>
        </ul>
    </nav>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
    props:{
        numberOfPages:{
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    emits: ['click'],
    setup() {
        const { emit } = getCurrentInstance();
        const onclick = (page) => {
            emit('click',page)
        };

        return {
            onclick
        }
    }
}
</script>

<style>

</style>