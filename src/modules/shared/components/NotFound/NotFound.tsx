import nodatafound from '../../../../assets/Images/nodatafound.gif';
export default function NotFound() {
  return (
    <div>
      <img src={nodatafound} alt="no data" className='xs:w-[100%] md:w-[80%] lg:w-[60%] h-screen !mx-auto'/>
    </div>
  )
}
