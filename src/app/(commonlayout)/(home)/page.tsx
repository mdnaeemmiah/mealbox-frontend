import Banner from '@/components/modules/home/Banner';
import Headding from '@/components/modules/home/Headding';
import HPreference from '@/components/modules/home/HPreference';
import HProviderMeal from '@/components/modules/home/HProviderMeal';
import Info from '@/components/modules/home/Info';


const HomePage = () => {
    return (
        <div>
            <Info></Info>
            <Headding></Headding>
            <Banner></Banner>
            <HProviderMeal></HProviderMeal>
            <HPreference></HPreference>
        </div>
    );
};

export default HomePage;