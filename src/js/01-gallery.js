// Add imports above this line
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items.js';
import '~node_modules/simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);
const refs = {
  galleryContainer: document.querySelector('.gallery'),
  body: document.body,
};

const galleryMarkup = createImgGalleryMarkup(galleryItems);
function createImgGalleryMarkup(item) {
  return item
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item"><a class="gallery__link" href="${original}">
     <img loading="lazy" width="354" height="240"
       class="gallery__image"
       src="${preview}"
      alt="${description}"
     />
   </a></li>`;
    })
    .join('');
}
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

const lazyImages = refs.galleryContainer.querySelectorAll('.gallery__image');

lazyImages.forEach(image =>
  image.addEventListener('load', onImageLoaded, { once: true })
);

function onImageLoaded(event) {
  event.target.classList.add('appear');
}
lazyImages.forEach(image => image.addEventListener('mouseenter', onMouseEnter));

function onMouseEnter(event) {
  event.target.style.transitionDelay = '100ms';
  event.target.style.transitionDuration = '500ms';
}
