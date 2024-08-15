import Image from "next/image";
import Slide1 from '../../public/welcome1.png';
import Slide2 from '../../public/welcome2.png';
import Slide3 from '../../public/welcome3.png';
import styles from '../app/carousel.module.css'; 

export default function Carousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
      <div className={`carousel-indicators ${styles.carouselIndicators}`}>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image src={Slide1} className="d-block w-100" width={1920} height={960} />
        </div>
        <div className="carousel-item">
          <Image src={Slide2} className="d-block w-100" width={1920} height={960} />
        </div>
        <div className="carousel-item">
          <Image src={Slide3} className="d-block w-100" width={1920} height={960} />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
