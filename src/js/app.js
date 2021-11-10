import DnD from './dnd';
import Gallery from './gallery';

console.log('app started');

const gallery = new Gallery();
const dnd = new DnD();

dnd.drop();
gallery.events();
