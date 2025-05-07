import React from 'react';
import './Mentors.css';
import NavBar from '../../components/NavBar/NavBar';

const Mentors = () => {
  return (
    <div className='mentors-container'>
      <header>
        <NavBar/>
      </header>
      <main>
        <div className='mentors-section'>
          <h1 className='mentors-section-title'>Mentorlarımız</h1>
          <div className='mentor-cards'>
            <div className='mentor-card1'>
              <div className='mentor-card1-image'/>
                <h2 className='mentor-name1'>William Johnson</h2>
                <h3 className='mentor-job1'>Web Tasarımcı</h3>
                <p className='mentor-info1'>William, 10 yılı aşkın deneyime sahip bir web geliştirici, yazılım mühendisi ve mentordur.
                  Web teknolojileri ve yapay zeka alanlarında uzmanlaşmış, birçok şirkette proje geliştirmiştir.
                  Mentee'lerine yazılım geliştirme süreçlerini ve sektörde nasıl ilerleyebileceklerini öğretir.
                </p>
            </div>
            <div className='mentor-card2'>
              <div className='mentor-card2-image'/>
                <h2 className='mentor-name2'>Anastasia Petrov</h2>
                <h3 className='mentor-job2'>Oyun Geliştirici</h3>
                <p className='mentor-info2'>Anastasia, 10 yılı aşkın deneyime sahip bir oyun geliştirici, yazılım mühendisi ve mentordur.
                  Unity ve Unreal Engine gibi oyun motorlarında uzmanlaşmış, birçok projede ekip liderliği yapmıştır.
                  Mentee'lerine oyun geliştirme sürecini, kodlama standartlarını ve sektörde nasıl ilerleyebileceklerini öğretir.</p>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};
export default Mentors;
