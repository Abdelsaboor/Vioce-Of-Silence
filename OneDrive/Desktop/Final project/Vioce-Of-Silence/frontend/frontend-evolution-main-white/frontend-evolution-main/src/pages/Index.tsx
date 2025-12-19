import { ScrollScene3D } from '@/components/3d/ScrollScene3D';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Voice of Silence | Revolutionary Gesture Recognition Technology</title>
        <meta 
          name="description" 
          content="Transform hand gestures into seamless communication with our cutting-edge gesture recognition glove. 99% accuracy, real-time translation, designed for accessibility." 
        />
      </Helmet>
      
      <div className="relative">
        <ScrollScene3D />
      </div>
    </>
  );
};

export default Index;
