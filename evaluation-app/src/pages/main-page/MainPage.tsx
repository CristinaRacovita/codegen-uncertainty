import AppAppBar from '../../components/toolbar/Toolbar';
import DescriptionContent from '../../components/description-content/DescriptionContent';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function MainPage() {
    const handleExport = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'evaluations'));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (data.length === 0) {
                alert('No data found!');
                return;
            }

            // Convert to JSON string (pretty-printed)
            const jsonString = JSON.stringify(data, null, 2);

            // Trigger file download
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.json';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data from Firestore.');
        }
    };

    return (
        <div className="App">
            <AppAppBar />
            <DescriptionContent />
            { false && 
                <button
                    onClick={handleExport}
                    style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
                >
                    Export Evaluations
                </button>
            }

        </div>
    );
}
