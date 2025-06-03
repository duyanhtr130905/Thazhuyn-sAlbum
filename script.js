const imageUpload = document.getElementById('imageUpload');
const uploadButton = document.getElementById('uploadButton');
const deleteButton = document.getElementById('deleteButton');
const photoAlbum = document.querySelector('.photo-album');

uploadButton.addEventListener('click', () => {
    imageUpload.click();
});

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    // Hiển thị modal hoặc form để nhập mô tả
    const descriptionModal = document.createElement('div');
    descriptionModal.classList.add('modal'); // Thêm class 'modal' vào đây
    descriptionModal.innerHTML = `
        <div class="modal-content">
            <label for="imageDescription">Mô tả ảnh:</label>
            <textarea id="imageDescription"></textarea>
            <button id="confirmUpload">Xác nhận</button>
            <button id="cancelUpload">Hủy</button>
        </div>
    `;
    document.body.appendChild(descriptionModal);
    descriptionModal.classList.add('show'); // Hiển thị modal

    // Xử lý khi nhấn nút "Xác nhận"
    descriptionModal.querySelector('#confirmUpload').addEventListener('click', () => {
        const description = descriptionModal.querySelector('#imageDescription').value;

        reader.onload = (e) => {
            // Tạo element div cho photo-card
            const photoCard = document.createElement('div');
            photoCard.classList.add('photo-card');

            // Tạo element div cho photo-inner
            const photoInner = document.createElement('div');
            photoInner.classList.add('photo-inner');

            // Tạo element div cho photo-front
            const photoFront = document.createElement('div');
            photoFront.classList.add('photo-front');

            // Tạo element img
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Ảnh mới';

            // Tạo element div cho photo-back
            const photoBack = document.createElement('div');
            photoBack.classList.add('photo-back');

            // Tạo element p cho mô tả
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description; 

            // Kết hợp các element lại với nhau
            photoFront.appendChild(img);
            photoInner.appendChild(photoFront);
            photoBack.appendChild(descriptionElement);
            photoInner.appendChild(photoBack);
            photoCard.appendChild(photoInner);

            // Thêm photo-card vào album
            photoAlbum.appendChild(photoCard);

            // Đóng modal
            descriptionModal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(descriptionModal); 
            }, 300); // Đảm bảo animation kết thúc trước khi xóa
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    // Xử lý khi nhấn nút "Hủy"
    descriptionModal.querySelector('#cancelUpload').addEventListener('click', () => {
        descriptionModal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(descriptionModal); 
        }, 300); // Đảm bảo animation kết thúc trước khi xóa
    });
});

deleteButton.addEventListener('click', () => {
    const photoCards = document.querySelectorAll('.photo-card');
    if (photoCards.length > 0) {
        photoAlbum.removeChild(photoCards[photoCards.length - 1]);
    } else {
        alert('Không còn ảnh để xóa!');
    }
});


window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.photo-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight) {
            card.style.opacity = '1';
        }
    });
});