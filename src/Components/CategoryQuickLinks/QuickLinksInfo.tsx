import { getSanitizedHtml } from "libs/utils/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./categoryQuickLinks.module.scss";
import config from "Configurations/configurations";
interface IQuickLinksInfo {
  title: string;
  img: string;
  link: string;
}

const QuickLinksInfo: React.FunctionComponent<IQuickLinksInfo> = (
  props: IQuickLinksInfo
) => {
  const [img, setImg] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [link, setLink] = useState<string>();
  const [image, setImage] = useState<any>("");

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setTitle(props.title);
      setImg(props.img);
      if (props.link) {
        let categoryIdentifier = undefined;

        try {
          categoryIdentifier = props.link.split("-").slice(-1)[0];
        } catch (exception: unknown) {}

        if (categoryIdentifier !== undefined) {
          setLink("/online-shopping/category/" + categoryIdentifier);
        }
      }
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  useEffect(() => {
    let mounted = `${config.images.cloudinaryBaseImageUrl}${config.images.categoriesBaseImageUrl}`;

    if (mounted) {
      setImage(`${mounted}`);
    }
    return () => {
      mounted = "";
    };
  }, []);

  return (
    <div className={styles.categoryInfo}>
      <div className={styles.img}>
        <Link to={`${link}`}>
          {/* <Asset alt="konga prime order img" className={"mb-3"} name={img} type={constants.asset.cloudinaryType} /> */}
          <img src={`${image}/${img}`} />
        </Link>
      </div>
      <div dangerouslySetInnerHTML={getSanitizedHtml(title ?? "")} />
    </div>
  );
};

export default QuickLinksInfo;
