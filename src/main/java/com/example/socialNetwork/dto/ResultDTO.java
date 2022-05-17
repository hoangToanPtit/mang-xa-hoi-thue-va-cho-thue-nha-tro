package com.example.socialNetwork.dto;

import java.util.List;

public class ResultDTO implements Comparable<ResultDTO>{
	private PostDTO post;
	private Float score;
	
	
	public ResultDTO(PostDTO post, PostConditionDTO postCondition) {
		super();
		this.post = post;
		fsetScore(postCondition);
	}
	
	
	private void fsetScore(PostConditionDTO postCondition) {
		
//		System.out.println(postCondition);
		
		int res = 0;
		int total = 0;
		if(postCondition.getConditioner()!=null && postCondition.getConditioner()==1) {
			total++;
			if(post.getConditioner()==1) res++;
		}
		if(postCondition.getPrivateWc()!=null && postCondition.getPrivateWc()==1) {
			total++;
			if(post.getPrivateWc()==1) res++;
		}
		if(postCondition.getParking()!=null && postCondition.getParking()==1) {
			total++;
			if(post.getParking()==1) res++; 
		}
		if(postCondition.getWifi()!=null && postCondition.getWifi()==1) {
			total++;
			if(post.getWifi()==1) res++; 
		}
		if(postCondition.getKeyy()!=null && postCondition.getKeyy()==1) {
			total++;
			if(post.getKeyy()==1) res++; 
		}
		if(postCondition.getBed()!=null && postCondition.getBed()==1) {
			total++;
			if(post.getBed()==1) res++; 
		}
		if(postCondition.getPet()!=null && postCondition.getPet()==1) {
			total++;
			if(post.getPet()==1) res++; 
		}
		if(postCondition.getGuard()!=null && postCondition.getGuard()==1) {
			total++;
			if(post.getGuard()==1) res++; 
		}
		if(postCondition.getCloset()!=null && postCondition.getCloset()==1) {
			total++;
			if(post.getCloset()==1) res++; 
		}
		if(postCondition.getTablee()!=null && postCondition.getTablee()==1) {
			total++;
			if(post.getTablee()==1) res++; 
		}
		if(postCondition.getWindoww()!=null && postCondition.getWindoww()==1) {
			total++;
			if(post.getWindoww()==1) res++; 
		}
		if(postCondition.getRefrigerator()!=null && postCondition.getRefrigerator()==1) {
			total++;
			if(post.getRefrigerator()==1) res++; 
		}
		if(postCondition.getWaterHeater()!=null && postCondition.getWaterHeater()==1) {
			total++;
			if(post.getWaterHeater()==1) res++; 
		}
		
		
		if(postCondition.getLastRentPrice() > 0) {
			total +=20;
			if(postCondition.getFirstRentPrice()<=post.getRentPrice() &&
					postCondition.getLastRentPrice()>=post.getRentPrice()) {
				res+=20;
			}			
		}
		
		if(postCondition.getLastSize()!=null && postCondition.getLastSize() != 0) {
			total +=15;
			if(postCondition.getFirstSize()<=post.getSize() &&
					postCondition.getLastSize()>=post.getSize()) res+=15;
		}
		
		if(postCondition.getCapacity()!=null &&  postCondition.getCapacity()>0) {
			total +=10;
			if(postCondition.getCapacity()>=post.getCapacity()) res+=10;			
		}
		
		
		int lc = 1;
		if(postCondition.getDistrict()!=null) {
			total += 25;
			if(postCondition.getDistrict().equalsIgnoreCase(post.getDistrict())) res+=25;
			else lc=0;
		}
		if(postCondition.getWards()!=null) {
			total += 20;
			if(postCondition.getWards().equalsIgnoreCase(post.getWards())) res+=20;
			else lc=0;
		}
		if(postCondition.getStreetName()!=null && postCondition.getStreetName().trim().length()>0) {
			total += 25;
			if(postCondition.getStreetName().contains(post.getStreetName())) res+=25;
		}
		
// total = 0 
	
		if(postCondition.getProvince()!=null) {
			total += 20;
			if(postCondition.getProvince().equals(post.getProvince())) {
				res+=20;
				System.out.println("pro: " + total);
			}
			else {
				lc=0;
				total = 0;
			}
		}
		int bl = 0;
		List<String> roomTypes = postCondition.getRoomType();
		if(roomTypes.size()>0) {
			bl = 0;
			for (String str : roomTypes) {
//				System.out.println("type:  "+ str+"  post:"+post.getRoomType());
				if(str.equals(post.getRoomType())) {
					bl=1; break;
				}
			}
			if(bl==0) {
				total=0;
			}
		}
		if(postCondition.getGender()!=null && !postCondition.getGender().equals("Tất cả")) {
			if(postCondition.getGender().equals(post.getGender())) {
				total=0;
			}
		}
		
		if(res==0 && total==0 && bl==1 && lc==1) {
			this.score=100f;
			return;
		}
		if(total==0) {
			this.score = 0f;
			return;
		}
		int tmp = (int) (res*1.0f/total*10000);
		this.score = tmp/100.0f;
	}
	
	
	
	public PostDTO getPost() {
		return post;
	}
	public Float getScore() {
		return score;
	}
	public void setPost(PostDTO post) {
		this.post = post;
	}
	public void setScore(Float score) {
		this.score = score;
	}


	@Override
	public int compareTo(ResultDTO o) {
		if(this.score>=o.score) return -1;
		return 1;
	}
	
	
	
}
