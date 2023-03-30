import Carousel from 'react-bootstrap/Carousel';
import caro1 from '../../public/images/caro1.webp'
import caro2 from '../../public/images/caro2.jpg'
import caro3 from '../../public/images/caro3.jpg'
import './carousal.css'


function IndividualIntervalsExample() {
  return (
    <Carousel className='carosal-container'>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={caro1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src={caro2}
          alt="Second slide"
        />
   
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={caro3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;