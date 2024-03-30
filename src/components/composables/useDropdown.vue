<script setup>
    import { ref } from 'vue'

/**
 * 
 * @param {Element} node Html element that will behave like a dropdown menu, controlled by the click of a button  
 */
export default function useDropdown (node) {

    const unfolded = ref(false);
    const control = node.querySelector('.dropdown-control');
    const content = node.querySelector('.dropdown-content');
    control.addEventListener('click', () => {
        unfolded.value = !unfolded.value;
        if (unfolded.value) content.classList.add('unfolded')
        else content.classList.remove('unfolded');
    });

}
</script>