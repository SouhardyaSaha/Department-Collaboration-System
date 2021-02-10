import Swal from 'sweetalert2';

export function popupNotification(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
}
