<template>
<div class="p-5">
    <div class="flex justify-center flex-wrap">
        <div class="flex m-2 bg-gray-50 rounded-lg">

            <button 
            @click="setFilter(1)"
            :class="bgColor(1)"
            class="text-base  rounded-r-none  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-blue-700 hover:text-blue-100 text-gray-700 ">
                <div>
                    Show All</div>
            </button>
            <button 
            @click="setFilter(2)"
            :class="bgColor(2)"
            class="text-base  rounded-l-none rounded-r-none border-l-0 border-r-0  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-blue-700 hover:text-blue-100 text-gray-700 ">
                <div>
                    My Games</div>
            </button>
            <button 
            @click="setFilter(3)"
            :class="bgColor(3)"
            class="text-base  rounded-l-none  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-blue-700 hover:text-blue-100 text-gray-700 ">
                <div>
                    Waiting My Move</div>
            </button>
            <button 
            @click="setFilter(4)"
            :class="bgColor(4)"
            class="text-base  rounded-l-none  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-blue-700 hover:text-blue-100 text-gray-700 ">
                <div>
                    Can Join</div>
            </button>
        </div>
    </div>

</div>
</template>


<script>
import {ref} from 'vue';

export default {
    emits: ['update:modelValue'],
    setup(props, {emit}) {
        const filter = ref(1);

        const bgColor = function(filterNo){
            if(filterNo === filter.value) return 'bg-blue-500';
            else return 'bg-gray-50';
        }

        const setFilter = function(filterNo){
            filter.value = filterNo;
            emit('update:modelValue', filterNo);
        }

        return {filter, bgColor, setFilter};
    },
}
</script>