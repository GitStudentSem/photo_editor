import { PhotoStore } from "../../../store/store";
import { ImageItem } from "../../ImageItem/ImageItem";
import { observer } from "mobx-react-lite";
import { memo } from "react";

const UnprocessedTab = observer(() => {
	return (
		<>
			{PhotoStore.photo && [...PhotoStore.photo].map((item, index) => {
				return <ImageItem key={item.name + index}
					// imageSrc={URL.createObjectURL(item)}
					imageSrc={'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'}
					imageTitle={item.name}
					imageInfo={(item.size / (1024 * 1024)).toFixed(1)}
				/>;
			})}
		</>
	);
});

const memoizedUnprocessedTab = memo(UnprocessedTab)

export default memoizedUnprocessedTab;