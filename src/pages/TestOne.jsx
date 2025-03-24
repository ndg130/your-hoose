import Button from '../components/Button'
import BreadCrumbs from '../components/Breadcrumbs'
import { FaChevronRight } from "react-icons/fa6";
import SimpleHeader from '../components/SimpleHeader';

export default function TestOne() {
  return (
    <div>
        <div className='max-w-7xl mx-auto py-10 px-4'>
            <h1>Testing components</h1>

            <h2 className='mt-10'>Buttons</h2>
            <div className='flex flex-wrap gap-5 mt-5'>
                <Button style="primary" text="Button Primary" onClick={async () => {
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
                }}/>
                <Button style="secondary" text="Button Secondary"/>
                <Button style="outline" text="Button Outline"/>
                <Button style="warning" text="Button Warning"/>
                <Button style="danger" text="Button Danger"/>
            </div>
            <h2 className='mt-10'>Typography</h2>
            <div className='flex flex-col gap-x-5 mt-5'>
                <h1>The quick brown fox jumps over the lazy dog.</h1>
                <h2>The quick brown fox jumps over the lazy dog.</h2>
                <h3>The quick brown fox jumps over the lazy dog.</h3>
                <h4>The quick brown fox jumps over the lazy dog.</h4>
                <h5>The quick brown fox jumps over the lazy dog.</h5>
                <h6>The quick brown fox jumps over the lazy dog.</h6>
                <p>The quick brown fox jumps over the lazy dog.</p>
            </div>
            <h2 className='mt-10'>Breadcrumbs</h2>
            <div className='flex flex-col gap-x-5 mt-5 mb-10'>
                <BreadCrumbs items={[{label: 'Home', href: '/'}, {label: 'Items', href: '/'}, {label: 'Basket'}]} style="light" accent=">"/>
                <BreadCrumbs items={[{label: 'Home', href: '/'}, {label: 'Basket'}]}  style="dark" accent={<FaChevronRight size={10} />}/>
            </div>
            <h2 className='mb-5'>Headers</h2>
            <div>
                <h3 className='mb-2'>Simple header</h3>
                <p className='mb-5'>A simple header with subheader and description. Using the light theme</p>
                <SimpleHeader 
                subheaderText="This is the subheader" 
                headerText={'This is a simple header'} 
                description={'Add in some simple text here'} 
                style="light"
            />
                                <h3 className='mb-2'>Simple header</h3>
                <p className='mb-5'>A simple header with subheader and description. Using the light theme</p>
                <SimpleHeader 

                headerText={'This is a simple header'} 

                style="light"
                align={'center'}
                backgroundImage={'https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/16:9/w_1920%2Cc_limit/BlackForest-Germany-GettyImages-147180370.jpg'}
            />
            </div>
        </div>
    </div>
  )
}
